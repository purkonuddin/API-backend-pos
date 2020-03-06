'use strict';

var validator = require('validator');

/*
 * In general, coercers should be placed in 'before' if they are more like
 * to pass validation with coercion happening first, i.e. trimming content,
 * and they should be placed in 'after' if they are likely to break validation,
 * i.e. parsing JSON, which would break isJSON()
 */

module.exports.before = {
  // blacklist(input, chars) - remove characters that appear in the blacklist. The characters
  // are used in a RegExp and so you will need to escape some chars, e.g. blacklist(input, '\[\]').
  blacklist: validator.blacklist,
  // escape(input) - replace <, >, &, ', " and / with HTML entities.
  escape: validator.escape,
  // ltrim(input [, chars]) - trim characters from the left-side of the input.
  ltrim: function (str, chars) {
    return validator.ltrim(str, typeof chars === 'string' ? chars : undefined);
  },
  // normalizeEmail(email [, options]) - canonicalize an email address. options is an object which
  // defaults to { lowercase: true }. With lowercase set to true, the local part of the email
  // address is lowercased for all domains; the hostname is always lowercased and the local part
  // of the email address is always lowercased for hosts that are known to be case-insensitive
  // (currently only GMail). Normalization follows special rules for known providers:
  // currently, GMail addresses have dots removed in the local part and are stripped of tags
  // (e.g. some.one+tag@gmail.com becomes someone@gmail.com) and all @googlemail.com addresses
  // are normalized to @gmail.com.
  normalizeEmail: function (str, options) {
    return validator.normalizeEmail(str, typeof options === 'object' ? options : undefined);
  },
  // rtrim(input [, chars]) - trim characters from the right-side of the input.
  rtrim: function (str, chars) {
    return validator.rtrim(str, typeof chars === 'string' ? chars : undefined);
  },
  // stripLow(input [, keep_new_lines]) - remove characters with a numerical value < 32 and 127,
  // mostly control characters. If keep_new_lines is true, newline characters are preserved
  // (\n and \r, hex 0xA and 0xD). Unicode-safe in JavaScript.
  stripLow: function (str, options) {
    return validator.stripLow(str, typeof options === 'object' ? options.keep_new_lines : undefined);
  },
  // toBoolean(input [, strict]) - convert the input to a boolean. Everything except for '0',
  // 'false' and '' returns true. In strict mode only '1' and 'true' return true.
  toBoolean: function (str, options) {
    return validator.toBoolean(str, typeof options === 'object' ? options.strict : undefined);
  },
  // toDate(input) - convert the input to a date, or null if the input is not a date.
  toDate: validator.toDate,
  // toFloat(input) - convert the input to a float, or NaN if the input is not a float.
  toFloat: validator.toFloat,
  // toInt(input [, radix]) - convert the input to an integer, or NaN if the input is
  // not an integer.
  toInt: function (str, radix) {
    return validator.toInt(str, typeof radix === 'number' ? radix : undefined);
  },
  // Converts string to all lowercase characters
  toLowercase: function (str) {
    return str.toLowerCase();
  },
  // toString(input) - convert the input to a string.
  toString: validator.toString,
  // Converts string to all uppercase characters
  toUppercase: function (str) {
    return str.toUpperCase();
  },
  // trim(input [, chars]) - trim characters (whitespace by default) from both sides of the input.
  trim: function (str, chars) {
    return validator.trim(str, typeof chars === 'string' ? chars : undefined);
  },
  // whitelist(input, chars) - remove characters that do not appear in the whitelist. The
  // characters are used in a RegExp and so you will need to escape some chars,
  // e.g. whitelist(input, '\[\]').
  whitelist: validator.whitelist
};

module.exports.after = {
  // Converts str to a javascript object, or sets value to null if fails to convert
  // Whenever parseJSON is incluced in a route, isJSON should be used as a validator.
  parseJSON: function (str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.error(e, 'Failed to parse JSON. It is recommended to add isJSON validator to any routes with parseJSON.');
      return null;
    }
  },
  // Splits string into array. Takes optional 'options' object that can contain properties
  // 'separator' and 'limit'.
  split: function (str, options) {
    options = typeof options === 'object' ? options : {};
    return str.split(options.separator, options.limit);
  }
};