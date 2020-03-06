'use strict';

var validator = require('validator');

module.exports = {
  // contains(str, seed) - check if the string contains the seed.
  contains: validator.contains,
  // equals(str, comparison) - check if the string matches the comparison.
  equals: validator.equals,
  // isAfter(str [, date]) - check if the string is a date that's after the specified date (defaults to now).
  isAfter: function (str, date) {
    return validator.isAfter(str, typeof date !== 'boolean' ? date : undefined);
  },
  // isAlpha(str) - check if the string contains only letters (a-zA-Z).
  isAlpha: validator.isAlpha,
  // isAlphanumeric(str) - check if the string contains only letters and numbers.
  isAlphanumeric: validator.isAlphanumeric,
  // isAscii(str) - check if the string contains ASCII chars only.
  isAscii: validator.isAscii,
  // isBase64(str) - check if a string is base64 encoded.
  isBase64: validator.isBase64,
  // isBefore(str [, date]) - check if the string is a date that's before the specified date.
  isBefore: function (str, date) {
    return validator.isBefore(str, typeof date !== 'boolean' ? date : undefined);
  },
  // isBoolean(str) - check if a string is a boolean.
  isBoolean: validator.isBoolean,
  // isByteLength(str, min [, max]) - check if the string's length (in bytes) falls in a range.
  isByteLength: function (str, options) {
    return validator.isByteLength(str, options.min, options.max);
  },
  // isCreditCard(str) - check if the string is a credit card.
  isCreditCard: validator.isCreditCard,
  // isCurrency(str, options) - check if the string is a valid currency amount.
  // options is an object which defaults to {symbol: '$', require_symbol: false,
  // allow_space_after_symbol: false, symbol_after_digits: false, allow_negatives: true,
  // parens_for_negatives: false, negative_sign_before_digits: false,
  // negative_sign_after_digits: false, allow_negative_sign_placeholder: false,
  // thousands_separator: ',', decimal_separator: '.', allow_space_after_digits: false }.
  isCurrency: function (str, options) {
    return validator.isCurrency(str, typeof options === 'object' ? options : {});
  },
  // isDate(str) - check if the string is a date.
  isDate: validator.isDate,
  // isDivisibleBy(str, number) - check if the string is a number that's divisible by another.
  isDivisibleBy: validator.isDivisibleBy,
  // isEmail(str [, options]) - check if the string is an email. options is
  // an object which defaults to { allow_display_name: false, allow_utf8_local_part: true }.
  // If allow_display_name is set to true, the validator will also match Display Name <email-address>.
  // If allow_utf8_local_part is set to false, the validator will not allow any non-English
  // UTF8 character in email address' local part.
  isEmail: function (str, options) {
    return validator.isEmail(str, typeof options === 'object' ? options : undefined);
  },
  // isFQDN(str [, options]) - check if the string is a fully qualified domain name
  // (e.g. domain.com). options is an object which defaults to
  // { require_tld: true, allow_underscores: false, allow_trailing_dot: false }.
  isFQDN: function (str, options) {
    return validator.isFQDN(str, typeof options === 'object' ? options : undefined);
  },
  // isFloat(str [, options]) - check if the string is a float.
  // options is an object which can contain the keys min and/or max to validate
  // the float is within boundaries (e.g. { min: 7.22, max: 9.55 }).
  isFloat: function (str, options) {
    return validator.isFloat(str, typeof options === 'object' ? options : undefined);
  },
  // isFullWidth(str) - check if the string contains any full-width chars.
  isFullWidth: validator.isFullWidth,
  // isHalfWidth(str) - check if the string contains any half-width chars.
  isHalfWidth: validator.isHalfWidth,
  // isHexColor(str) - check if the string is a hexadecimal color.
  isHexColor: validator.isHexColor,
  // isHexadecimal(str) - check if the string is a hexadecimal number.
  isHexadecimal: validator.isHexadecimal,
  // isIP(str [, version]) - check if the string is an IP (version 4 or 6).
  isIP: function (str, version) {
    return validator.isIP(str, typeof version !== 'boolean' ? version : undefined);
  },
  // isISBN(str [, version]) - check if the string is an ISBN (version 10 or 13).
  isISBN: function (str, version) {
    return validator.isISBN(str, typeof version !== 'boolean' ? version : undefined);
  },
  // isISIN(str) - check if the string is an ISIN (stock/security identifier).
  isISIN: validator.isISIN,
  // isIn(str, values) - check if the string is in a array of allowed values.
  isIn: validator.isIn,
  // isInt(str [, options]) - check if the string is an integer. options is an object
  // which can contain the keys min and/or max to check the integer is within boundaries
  // (e.g. { min: 10, max: 99 }).
  isInt: function (str, options) {
    return validator.isInt(str, typeof options === 'object' ? options : undefined);
  },
  // isJSON(str) - check if the string is valid JSON (note: uses JSON.parse).
  isJSON: validator.isJSON,
  // isLength(str, min [, max]) - check if the string's length falls in a range.
  // Note: this function takes into account surrogate pairs.
  isLength: function (str, options) {
    return validator.isLength(str, options.min, options.max);
  },
  // isLowercase(str) - check if the string is lowercase.
  isLowercase: validator.isLowercase,
  // isMobilePhone(str, locale) - check if the string is a mobile phone number,
  // (locale is one of ['zh-CN', 'en-ZA', 'en-AU', 'en-HK', 'pt-PT', 'fr-FR',
  // 'el-GR', 'en-GB', 'en-US', 'en-ZM']).
  isMobilePhone: validator.isMobilePhone,
  // isMongoId(str) - check if the string is a valid hex-encoded representation
  // of a MongoDB ObjectId.
  isMongoId: validator.isMongoId,
  // isMultibyte(str) - check if the string contains one or more multibyte chars.
  isMultibyte: validator.isMultibyte,
  // isNull(str) - check if the string is null.
  isNull: validator.isNull,
  // isNumeric(str) - check if the string contains only numbers.
  isNumeric: validator.isNumeric,
  // isSurrogatePair(str) - check if the string contains any surrogate pairs chars.
  isSurrogatePair: validator.isSurrogatePair,
  // isURL(str [, options]) - check if the string is an URL. options is an object
  // which defaults to { protocols: ['http','https','ftp'], require_tld: true,
  // require_protocol: false, allow_underscores: false, host_whitelist: false,
  // host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false }.
  isURL: function (str, options) {
    return validator.isURL(str, typeof options === 'object' ? options : undefined);
  },
  // isUUID(str [, version]) - check if the string is a UUID (version 3, 4 or 5).
  isUUID: function (str, version) {
    return validator.isUUID(str, typeof version !== 'boolean' ? version : undefined);
  },
  // isUppercase(str) - check if the string is uppercase.
  isUppercase: validator.isUppercase,
  // isVariableWidth(str) - check if the string contains a mixture of full and
  // half-width chars.
  isVariableWidth: validator.isVariableWidth,
  // matches(str, pattern [, modifiers]) - check if string matches the pattern.
  // Either matches('foo', /foo/i) or matches('foo', 'foo', 'i').
  matches: function (str, options) {
    return validator.matches(str, options.pattern, options.modifiers);
  },
  // Allow custom validators
  validate: function (str, fn) {
    return fn(str);
  }
};