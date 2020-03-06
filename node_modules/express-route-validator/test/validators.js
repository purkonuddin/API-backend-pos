'use strict';

var validators = require('../lib/validators'),
    chai = require('chai'),
    expect = chai.expect;

/*
  NOTE: These tests are not meant to test the validator library.
  They are meant to affirm that the wrapping was done successfully,
  affirm that passing in `true` as the second argument in cases where
  a second argument is not required and won't break the check,
  and to test that objects of arguments are handled properly when validator
  requires/allows more than two arguments.
*/

describe('UNIT Validators', function () {
  describe('contains(str, seed)', function () {
    it('should return true if contains seed', function () {
      expect(validators.contains('foobar', 'foo')).to.be.true;
    });

    it('should return false if does not contain seed', function () {
      expect(validators.contains('fobar', 'foo')).to.be.false;
    });
  });

  describe('equals(str, comparison)', function () {
    it('should return true if str equals comparison', function () {
      expect(validators.equals('abc', 'abc')).to.be.true;
    });

    it('should return false if str does not equal comparison', function () {
      expect(validators.equals('abc', 'Abc')).to.be.false;
    });
  });

  describe('isAfter(str [, date])', function () {
    it('should return true if str is after Date.now() if not passed date as arg', function () {
      expect(validators.isAfter(new Date(Date.now() + 86400000), true)).to.be.true;
    });

    it('should return false if str is not after Date.now() if not passed date as arg', function () {
      expect(validators.isAfter(new Date(Date.now() - 86400000), true)).to.be.false;
    });

    it('should return true if str is after date, when passed as arg', function () {
      expect(validators.isAfter('2011-08-03', '2010-07-02')).to.be.true;
    });

    it('should return false if str is not after date, when passed as arg', function () {
      expect(validators.isAfter('2010-07-02', '2011-08-03')).to.be.false;
    });
  });

  describe('isAlpha(str)', function () {
    it('should return true if alpha string', function () {
      expect(validators.isAlpha('abc', true)).to.be.true;
    });

    it('should return false if not alpha string', function () {
      expect(validators.isAlpha('abc1', true)).to.be.false;
    });
  });

  describe('isAlphanumeric(str)', function () {
    it('should return true if str is alphanumeric', function () {
      expect(validators.isAlphanumeric('abc123', true)).to.be.true;
    });

    it('should return false if str is not alphanumeric', function () {
      expect(validators.isAlphanumeric('abc ', true)).to.be.false;
    });
  });

  describe('isAscii(str)', function () {
    it('should return true if str is all ascii characters', function () {
      expect(validators.isAscii('foobar', true)).to.be.true;
    });

    it('should return false if str is not all ascii characters', function () {
      expect(validators.isAscii('ｆｏｏbar', true)).to.be.false;
    });
  });

  describe('isBase64(str)', function () {
    it('should return true if str is a base64 string', function () {
      expect(validators.isBase64('U3VzcGVuZGlzc2UgbGVjdHVzIGxlbw==', true)).to.be.true;
    });

    it('should return false if str is not a base64 string', function () {
      expect(validators.isBase64('12345', true)).to.be.false;
    });
  });

  describe('isBefore(str [, date])', function () {
    it('should return true if str is before Date.now(), if no date is passed', function () {
      expect(validators.isBefore('2000-08-04', true)).to.be.true;
    });

    it('should return false if str is not before Date.now(), if no date is passed', function () {
      expect(validators.isBefore(new Date(Date.now() + 86400000), true)).to.be.false;
    });

    it('should return true if str is before date, when passed as arg', function () {
      expect(validators.isBefore('2000-08-04', new Date(2011, 9, 10))).to.be.true;
    });

    it('should return false if str is not before date, when passed as arg', function () {
      expect(validators.isBefore(new Date(2011, 9, 10), '2000-08-04')).to.be.false;
    });
  });

  describe('isBoolean(str)', function () {
    it('should return true if str is a boolean', function () {
      expect(validators.isBoolean('true', true)).to.be.true;
    });

    it('should return false if str is not a boolean', function () {
      expect(validators.isBoolean('tru', true)).to.be.false;
    });
  });

  describe('isByteLength(str, options)', function () {
    it('should return true if greater than min', function () {
      expect(validators.isByteLength('abc', { min: 2 })).to.be.true;
    });

    it('should return false if not greater than min', function () {
      expect(validators.isByteLength('a', { min: 2 })).to.be.false;
    });

    it('should return true if greater than min and less than max', function () {
      expect(validators.isByteLength('abc', { min: 2, max: 3 })).to.be.true;
    });

    it('should return false if not greater than min and less than max', function () {
      expect(validators.isByteLength('abcd', { min: 2, max: 3 })).to.be.false;
    });
  });

  describe('isCreditCard(str)', function () {
    it('should return true if str is a credit card number', function () {
      expect(validators.isCreditCard('375556917985515', true)).to.be.true;
    });

    it('should return false if str is not a credit card number', function () {
      expect(validators.isCreditCard('foo', true)).to.be.false;
    });
  });

  describe('isCurrency(str [,options])', function () {
    it('should return true if valid currency when not passed options', function () {
      expect(validators.isCurrency('$10,123.45', true)).to.be.true;
    });

    it('should return false if not valid currency when not passed options', function () {
      expect(validators.isCurrency('10,123.45$', true)).to.be.false;
    });

    it('should return true if valid currency per passed in options', function () {
      expect(validators.isCurrency('¥10.03', { symbol:'¥', allow_negatives: false })).to.be.true;
    });

    it('should return false if not valid currency per passed in options', function () {
      expect(validators.isCurrency('$10.03', { symbol:'¥', allow_negatives: false })).to.be.false;
    });
  });

  describe('isDate(str)', function () {
    it('should return true if valid date string', function () {
      expect(validators.isDate('2011-08-04', true)).to.be.true;
    });

    it('should return false if not valid date string', function () {
      expect(validators.isDate('2011-foo-04', true)).to.be.false;
    });
  });

  describe('isDivisibleBy(str, number)', function () {
    it('should return true if str is divisible by number', function () {
      expect(validators.isDivisibleBy('4', 2)).to.be.true;
    });

    it('should return false if str is not divisible by number', function () {
      expect(validators.isDivisibleBy('1', 2)).to.be.false;
    });
  });

  describe('isEmail(str [,options])', function () {
    it('should return true if passed in valid email, no options', function () {
      expect(validators.isEmail('foo@bar.com', true)).to.be.true;
    });

    it('should return false if not passed in valid email, no options', function () {
      expect(validators.isEmail('invalidemail@', true)).to.be.false;
    });

    it('should return true if passed in valid email with options', function () {
      expect(validators.isEmail('hans@m端ller.com', { allow_utf8_local_part: false })).to.be.true;
    });

    it('should return false if not passed in valid email with options', function () {
      expect(validators.isEmail('hans.m端ller@test.com', { allow_utf8_local_part: false })).to.be.false;
    });
  });

  describe('isFQDN(str [,options])', function () {
    it('should return true if passed a valid FQDN, no options', function () {
      expect(validators.isFQDN('domain.com', true)).to.be.true;
    });

    it('should return false if not passed a valid FQDN, no options', function () {
      expect(validators.isFQDN('abc', true)).to.be.false;
    });

    it('should return true if passed a valid FQDN, with options', function () {
      expect(validators.isFQDN('example.com.', { allow_trailing_dot: true })).to.be.true;
    });

    it('should return false if not passed a valid FQDN, with options', function () {
      expect(validators.isFQDN('abc', { allow_trailing_dot: true })).to.be.false;
    });
  });

  describe('isFloat(str [,options])', function () {
    it('should return true if valid float, no options', function () {
      expect(validators.isFloat('123.123', true)).to.be.true;
    });

    it('should return false if not a valid float, no options', function () {
      expect(validators.isFloat(' ', true)).to.be.false;
    });

    it('should return true if valid float, with options', function () {
      expect(validators.isFloat('0.1', { min: 0.1, max: 1.0 })).to.be.true;
    });

    it('should return false if not a valid float, with options', function () {
      expect(validators.isFloat('-0.1', { min: 0.1, max: 1.0 })).to.be.false;
    });
  });

  describe('isFullWidth(str)', function () {
    it('should return true if full width', function () {
      expect(validators.isFullWidth('ひらがな・カタカナ、．漢字', true)).to.be.true;
    });

    it('should return false if not full width', function () {
      expect(validators.isFullWidth('abc', true)).to.be.false;
    });
  });

  describe('isHalfWidth(str)', function () {
    it('should return true if half width', function () {
      expect(validators.isHalfWidth('!"#$%&()<>/+=-_? ~^|.,@`{}[]', true)).to.be.true;
    });

    it('should return false if not half width', function () {
      expect(validators.isHalfWidth('あいうえお', true)).to.be.false;
    });
  });

  describe('isHexColor(str)', function () {
    it('should return true if hex color', function () {
      expect(validators.isHexColor('#ff0034', true)).to.be.true;
    });

    it('should return false if not hex color', function () {
      expect(validators.isHexColor('#ff', true)).to.be.false;
    });
  });
  
  describe('isHexadecimal(str)', function () {
    it('should return true if hexadecimal', function () {
      expect(validators.isHexadecimal('deadBEEF', true)).to.be.true;
    });

    it('should return false if not hexadecimal', function () {
      expect(validators.isHexadecimal('abcdefg', true)).to.be.false;
    });
  });
  
  describe('isIP(str [, version])', function () {
    it('should return true if valid IP, no version passed', function () {
      expect(validators.isIP('127.0.0.1', true)).to.be.true;
    });

    it('should return false if not valid IP, no version passed', function () {
      expect(validators.isIP('abc', true)).to.be.false;
    });

    it('should return true if valid IP, version passed', function () {
      expect(validators.isIP('127.0.0.1', 4)).to.be.true;
    });

    it('should return false if not valid IP, version passed', function () {
      expect(validators.isIP('127.0.0.1', 6)).to.be.false;
    });
  });
  
  describe('isISBN(str [,version])', function () {
    it('should return true if valid ISBN, no version passed', function () {
      expect(validators.isISBN('3836221195', true)).to.be.true;
    });

    it('should return false if not valid ISBN, no version passed', function () {
      expect(validators.isISBN('3423214121', true)).to.be.false;
    });

    it('should return true if valid ISBN, version passed', function () {
      expect(validators.isISBN('3836221195', 10)).to.be.true;
    });

    it('should return false if not valid ISBN, version passed', function () {
      expect(validators.isISBN('3836221195', 13)).to.be.false;
    });
  });
  
  describe('isISIN(str)', function () {
    it('should return true if valid ISIN', function () {
      expect(validators.isISIN('AU0000XVGZA3', true)).to.be.true;
    });

    it('should return false if not valid ISIN', function () {
      expect(validators.isISIN('DE000BAY0018', true)).to.be.false;
    });
  });
  
  describe('isIn(str, values)', function () {
    it('should return true if str is in values array', function () {
      expect(validators.isIn('foo', ['foo', 'bar'])).to.be.true;
    });

    it('should return false if str is not in values array', function () {
      expect(validators.isIn('fiz', ['foo', 'bar'])).to.be.false;
    });
  });
  
  describe('isInt(str [, options])', function () {
    it('should return true if int, no options', function () {
      expect(validators.isInt('123', true)).to.be.true;
    });

    it('should return false if not int, no options', function () {
      expect(validators.isInt('01', true)).to.be.false;
    });

    it('should return true if int, with options', function () {
      expect(validators.isInt('12', { min: 10, max: 15 })).to.be.true;
    });

    it('should return false if not int, with options', function () {
      expect(validators.isInt('1', { min: 10, max: 15 })).to.be.false;
    });
  });
  
  describe('isJSON(str)', function () {
    it('should return true if JSON', function () {
      expect(validators.isJSON('{ "key": "value" }', true)).to.be.true;
    });

    it('should return false if not JSON', function () {
      expect(validators.isJSON({ key: 'value' }, true)).to.be.false;
    });
  });
  
  describe('isLength(str, options)', function () {
    it('should return true if str.length is greater than min', function () {
      expect(validators.isLength('abc', { min: 2 })).to.be.true;
    });

    it('should return false if str.length is not greater than min', function () {
      expect(validators.isLength('a', { min: 2 })).to.be.false;
    });

    it('should return true if str.length is greater than min and less than max', function () {
      expect(validators.isLength('abc', { min: 2, max: 3 })).to.be.true;
    });

    it('should return false if str.length is not greater than min and less than max', function () {
      expect(validators.isLength('abcd', { min: 2, max: 3 })).to.be.false;
    });
  });
  
  describe('isLowercase(str)', function () {
    it('should return true if str is all lowercase', function () {
      expect(validators.isLowercase('abc', true)).to.be.true;
    });

    it('should return false if str is not all lowercase', function () {
      expect(validators.isLowercase('Abc', true)).to.be.false;
    });
  });
  
  describe('isMobilePhone(str, locale)', function () {
    it('should return true if valid mobile phone number', function () {
      expect(validators.isMobilePhone('19876543210', 'en-US')).to.be.true;
    });

    it('should return false if not a valid mobile phone number', function () {
      expect(validators.isMobilePhone('+10345672645', 'en-US')).to.be.false;
    });
  });
  
  describe('isMongoId(str)', function () {
    it('should return true if valid ObjectID', function () {
      expect(validators.isMongoId('507f1f77bcf86cd799439011', true)).to.be.true;
    });

    it('should return false if not valid ObjectID', function () {
      expect(validators.isMongoId('507f1f77bcf86cd7994390', true)).to.be.false;
    });
  });
  
  describe('isMultibyte(str)', function () {
    it('should return true if multibyte', function () {
      expect(validators.isMultibyte('ひらがな・カタカナ、．漢字', true)).to.be.true;
    });

    it('should return false if not multibyte', function () {
      expect(validators.isMultibyte('abc', true)).to.be.false;
    });
  });
  
  describe('isNull(str)', function () {
    it('should return true if null string', function () {
      expect(validators.isNull('', true)).to.be.true;
    });

    it('should return false if not null string', function () {
      expect(validators.isNull('foo', true)).to.be.false;
    });
  });
  
  describe('isNumeric(str)', function () {
    it('should return true if numeric', function () {
      expect(validators.isNumeric('123', true)).to.be.true;
    });

    it('should return false if not numeric', function () {
      expect(validators.isNumeric(' ', true)).to.be.false;
    });
  });
  
  describe('isSurrogatePair(str)', function () {
    it('should return true if surrogate pair', function () {
      expect(validators.isSurrogatePair('ABC千𥧄1-2-3', true)).to.be.true;
    });

    it('should return false if not surrogate pair', function () {
      expect(validators.isSurrogatePair('ABC1-2-3', true)).to.be.false;
    });
  });
  
  describe('isURL(str [, options])', function () {
    it('should return true if valid URL, no options', function () {
      expect(validators.isURL('http://www.foobar.com/', true)).to.be.true;
    });

    it('should return false if not valid URL, no options', function () {
      expect(validators.isURL('xyz://foobar.com', true)).to.be.false;
    });

    it('should return true if valid URL, with options', function () {
      expect(validators.isURL('http://www.foobar.com/', { protocols: ['http'] })).to.be.true;
    });

    it('should return false if not valid URL, with options', function () {
      expect(validators.isURL('https://www.foobar.com/',  { protocols: ['http'] })).to.be.false;
    });
  });
  
  describe('isUUID(str [, version])', function () {
    it('should return true if valid UUID, no version passed', function () {
      expect(validators.isUUID('A987FBC9-4BED-3078-CF07-9141BA07C9F3', true)).to.be.true;
    });

    it('should return false if not valid UUID, no version passed', function () {
      expect(validators.isUUID('xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3', true)).to.be.false;
    });

    it('should return true if valid UUID, no version passed', function () {
      expect(validators.isUUID('713ae7e3-cb32-45f9-adcb-7c4fa86b90c1', 4)).to.be.true;
    });

    it('should return false if not valid UUID, no version passed', function () {
      expect(validators.isUUID('713ae7e3-cb32-45f9-adcb-7c4fa86b90c1', 3)).to.be.false;
    });
  });
  
  describe('isUppercase(str)', function () {
    it('should return true if all uppercase', function () {
      expect(validators.isUppercase('ABC', true)).to.be.true;
    });

    it('should return false if not all uppercase', function () {
      expect(validators.isUppercase('aBC', true)).to.be.false;
    });
  });
  
  describe('isVariableWidth(str)', function () {
    it('should return true if variable width', function () {
      expect(validators.isVariableWidth('ひらがなカタカナ漢字ABCDE', true)).to.be.true;
    });

    it('should return false if not variable width', function () {
      expect(validators.isVariableWidth('abc', true)).to.be.false;
    });
  });
  
  describe('matches(str, args)', function () {
    it('should return true if matches pattern', function () {
      expect(validators.matches('abc', { pattern: /abc/ })).to.be.true;
    });

    it('should return false if does not match pattern', function () {
      expect(validators.matches('ac', { pattern: 'abc' })).to.be.false;
    });

    it('should return true if matches pattern with modifier', function () {
      expect(validators.matches('Abc', { pattern: 'abc', modifiers: 'i' })).to.be.true;
    });

    it('should return false if does not match pattern with modifier', function () {
      expect(validators.matches('Acb', { pattern: 'abc', modifiers: 'i' })).to.be.false;
    });
  });

  describe('validate(str, fn)', function () {
    it('should take a custom validation function and return the result', function () {
      var isPercent = function (str) {
        var val = +str;
        return !!(val && val >= 0 && val <= 1);
      };
      expect(validators.validate('0.1', isPercent)).to.be.true;
      expect(validators.validate('20', isPercent)).to.be.false;
      expect(validators.validate('banana', isPercent)).to.be.false;
    });
  });
});