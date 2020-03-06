'use strict';

var routeValidator = {};

var validators = routeValidator._validators = require('./validators');

var coercers = require('./coercers');
var beforeCoercers = routeValidator._before = coercers.before;
var afterCoercers = routeValidator._after = coercers.after;

var paths = ['params', 'body', 'query', 'headers'];

routeValidator._errorHandler = function (err, req, res) {
  return res.status(400).send({
    error: err.message
  });
};

routeValidator._callNext = false;

routeValidator.set = function (key, value) {
  switch (key) {
    case 'errorHandler':
      routeValidator._errorHandler = value;
      break;
    case 'callNext':
      routeValidator._callNext = value;
      break;
    default:
      console.warn('Attempted to set invalid key: ' + key);
      break;
  }
};

routeValidator.addValidator = function addValidator (name, fn) {
  if (typeof fn === 'function') {
    validators[name] = fn;
  } else {
    console.warn('Validators must be functions. Did not add: ' + name);
  }
};

routeValidator.addValidators = function (obj) {
  for (var key in obj) {
    routeValidator.addValidator(key, obj[key]);
  }
};

function _addCoerceMethod (methods, name, fn) {
  if (typeof fn === 'function') {
    methods[name] = fn;
  } else {
    console.warn('Coercers must be functions. Did not add: ' + name);
  }
}

/*
  {
    stage: 'before',
    coerce: function () { ... }
  }
*/
routeValidator.addCoercer = function addCoercer (name, config) {
  switch (config.stage) {
    case 'before':
      _addCoerceMethod(beforeCoercers, name, config.coerce);
      break;
    case 'after':
      _addCoerceMethod(afterCoercers, name, config.coerce);
      break;
    default:
      console.warn('Coerce method stage invalid for method: ' + name);
      break;
  }
};

/*
  {
    poundsToKilos: {
      stage: 'before',
      coerce: function () { ... }
    }
  }
*/
routeValidator.addCoercers = function (obj) {
  for (var key in obj) {
    if (typeof obj[key] === 'object') {
      routeValidator.addCoercer(key, obj[key]);
    }
  }
};

routeValidator.validate = function (config) {
  return function (req, res, next) {
    for (var i = 0, length = paths.length; i < length; i++) {
      var err, path = paths[i];
      if (config[path]) {
        err = _validatePath(path);
      }
      if (err) {
        return _handleResult(err);
      }
    }

    return _handleResult(null);

    function _validatePath (path) {
      var conf = config[path],
          scope = req[path] || {},
          tasks = {
            validation: [],
            after: []
          };

      for (var key in conf) {
        var obj = conf[key],
            prop, i, length;

        tasks.validation.length = 0;
        tasks.after.length = 0;

        if (scope[key] === undefined) {
          if (obj.isRequired) {
            return new Error(path + '.' + key + ' is required');
          }
          // Otherwise, get out of here
          continue;
        }

        for (prop in obj) {
          if (beforeCoercers[prop]) {
            scope[key] = beforeCoercers[prop](scope[key], obj[prop]);
          } else if (validators[prop]) {
            tasks.validation.push(prop);
          } else if (afterCoercers[prop]) {
            tasks.after.push(prop);
          }
          // Otherwise, just ignore the property
        }

        // Run validators
        for (i = 0, length = tasks.validation.length; i < length; i++) {
          prop = tasks.validation[i];
          if (!validators[prop](scope[key], obj[prop])) {
            return new Error(obj.message || path + '.' + key + ' failed validation');
          }
        }

        // Run after methods
        for (i = 0, length = tasks.after.length; i < length; i++) {
          prop = tasks.after[i];
          scope[key] = afterCoercers[prop](scope[key], obj[prop]);
        }
      }
      return;
    }

    function _handleResult (err) {
      if (err) {
        if (config.errorHandler) {
          return config.errorHandler(err, req, res, next);
        } else if (!config.callNext && (!routeValidator._callNext || config.callNext === false)) {
          return routeValidator._errorHandler(err, req, res, next);
        }
      }

      return next(err);
    }
  };
};

module.exports = routeValidator;