'use strict';

var coercers = require('../lib/coercers'),
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

describe('UNIT Coercers', function () {
  describe('before validation methods', function () {
    describe('blacklist(str, chars)', function () {
      it('should remove blacklist characters', function () {
        expect(coercers.before.blacklist('abcdef', 'abc')).to.equal('def');
        expect(coercers.before.blacklist('aaaaaaaaaabbbbbbbbbb', 'abc')).to.equal('');
      });
    });

    describe('escape(str)', function () {
      it('should escape string with html', function () {
        expect(coercers.before.escape('<script> alert("xss&fun"); </script>', true)).to.equal('&lt;script&gt; alert(&quot;xss&amp;fun&quot;); &lt;&#x2F;script&gt;');
        expect(coercers.before.escape("<script> alert('xss&fun'); </script>", true)).to.equal('&lt;script&gt; alert(&#x27;xss&amp;fun&#x27;); &lt;&#x2F;script&gt;');
      });
    });

    describe('ltrim(str [, chars])', function () {
      it('should ltrim whitespace', function () {
        expect(coercers.before.ltrim('  \r\n\tfoo  \r\n\t   ', true)).to.equal('foo  \r\n\t   ');
      });

      it('should ltrim custom characters', function () {
        expect(coercers.before.ltrim('010100201000', '01')).to.equal('201000');
      });
    });

    describe('normalizeEmail(str [, options])', function () {
      it('should normalize email address', function () {
        expect(coercers.before.normalizeEmail('test@me.com', true)).to.equal('test@me.com');
        expect(coercers.before.normalizeEmail('some.name@googleMail.com', true)).to.equal('somename@gmail.com');
      });

      it('should normalize email address, with options', function () {
        expect(coercers.before.normalizeEmail('test@me.com', { lowercase: false })).to.equal('test@me.com');
        expect(coercers.before.normalizeEmail('TEST@me.com', { lowercase: false })).to.equal('TEST@me.com');
      });
    });

    describe('rtrim(str [, chars])', function () {
      it('should rtrim whitespace', function () {
        expect(coercers.before.rtrim('  \r\n\tfoo  \r\n\t   ', true)).to.equal('  \r\n\tfoo');
      });

      it('should rtrim custom characters', function () {
        expect(coercers.before.rtrim('010100201000', '01')).to.equal('0101002');
      });
    });

    describe('stripLow(str [, options])', function () {
      it('should strip low characters, numerical value < 32 and 127', function () {
        expect(coercers.before.stripLow("foo\x00", true)).to.equal("foo");
        expect(coercers.before.stripLow("perch\u00e9", true)).to.equal("perch\u00e9");
      });

      it('should keep new lines if options.keep_new_lines is set to true', function () {
        expect(coercers.before.stripLow("foo\x0A\x0D", { keep_new_lines: true })).to.equal("foo\x0A\x0D");
        expect(coercers.before.stripLow("\x03foo\x0A\x0D", { keep_new_lines: true })).to.equal("foo\x0A\x0D");
      });
    });

    describe('toBoolean(str [, options])', function () {
      it('should return true when passed a truthy value and false otherwise, no options', function () {
        expect(coercers.before.toBoolean(true, true)).to.be.true;
        expect(coercers.before.toBoolean('1', true)).to.be.true;
        expect(coercers.before.toBoolean('true', true)).to.be.true;
        expect(coercers.before.toBoolean('false', true)).to.be.false;
        expect(coercers.before.toBoolean('foobar', true)).to.be.true;
      });

      it('should only return true when pass "1" or "true" when options.strict is true', function () {
        expect(coercers.before.toBoolean(true, { strict: true })).to.be.true;
        expect(coercers.before.toBoolean('1', { strict: true })).to.be.true;
        expect(coercers.before.toBoolean('true', { strict: true })).to.be.true;
        expect(coercers.before.toBoolean('false', { strict: true })).to.be.false;
        expect(coercers.before.toBoolean('foobar', { strict: true })).to.be.false;
      });
    });

    describe('toDate(str)', function () {
      it('should convert intput to a date, or null if input is not a date', function () {
        expect(coercers.before.toDate(new Date(), true)).to.be.an.instanceOf(Date);
        expect(coercers.before.toDate('Tue Jul 14 2015', true)).to.be.an.instanceOf(Date);
        expect(coercers.before.toDate('Tue Jul 14 2015 15:06:31 GMT-0700 (PDT)', true)).to.be.an.instanceOf(Date);
        expect(coercers.before.toDate('foobar', true)).to.be.null;
        expect(coercers.before.toDate(1436911591654, true)).to.be.null;
      });
    });

    describe('toFloat(str)', function () {
      it('should return a float when passed a float string or float', function () {
        expect(coercers.before.toFloat(1.5, true)).to.equal(1.5);
        expect(coercers.before.toFloat('1.5', true)).to.equal(1.5);
        expect(coercers.before.toFloat('-1.5', true)).to.equal(-1.5);
        expect(coercers.before.toFloat('foo', true)).to.not.be.ok;
      });
    });

    describe('toInt(str [, radix])', function () {
      it('should return an int when passed a int string or int', function () {
        expect(coercers.before.toInt(5, true)).to.equal(5);
        expect(coercers.before.toInt('5', true)).to.equal(5);
        expect(coercers.before.toInt('-5', true)).to.equal(-5);
        expect(coercers.before.toInt('foo', true)).to.not.be.ok;
      });

      it('should return an int to a specify radix when passed a radix', function () {
        expect(coercers.before.toInt('ff', 16)).to.equal(255);
        expect(coercers.before.toInt('377', 8)).to.equal(255);
      });
    });

    describe('toLowercase(str)', function () {
      it('should convert string to lowercase', function () {
        expect(coercers.before.toLowercase('aBc', true)).to.equal('abc');
      });
    });

    describe('toString(input)', function () {
      it('should convert input to a string', function () {
        expect(coercers.before.toString(1, true)).to.equal('1');
        expect(coercers.before.toString('1', true)).to.equal('1');
        expect(coercers.before.toString({ foo: 'bar' }, true)).to.equal('[object Object]');
      });
    });

    describe('toUppercase(str)', function () {
      it('should convert string to uppercase', function () {
        expect(coercers.before.toUppercase('aBc', true)).to.equal('ABC');
      });
    });

    describe('trim(str [, chars])', function () {
      it('should trim whitespace', function () {
        expect(coercers.before.trim('  \r\n\tfoo  \r\n\t   ', true)).to.equal('foo');
      });

      it('should trim custom characters', function () {
        expect(coercers.before.trim('010100201000', '01')).to.equal('2');
      });
    });

    describe('whitelist(str, chars)', function () {
      it('should remove characters that do not appear in whitelist', function () {
        expect(coercers.before.whitelist('abcdef', 'abc')).to.equal('abc');
        expect(coercers.before.whitelist('aaaaaaaaaabbbbbbbbbb', 'abc')).to.equal('aaaaaaaaaabbbbbbbbbb');
      });
    });
  });

  describe('after validation methods', function () {
    describe('parseJSON(str)', function () {
      it('should return a parsed javascript object when passed valid JSON', function () {
        var result = coercers.after.parseJSON('{ "foo": "bar" }', true);
        expect(result).to.be.an('object');
        expect(result).to.have.property('foo').that.equals('bar');
      });

      it('should return undefined if it fails to parse JSON, i.e. invalid JSON', function () {
        expect(coercers.after.parseJSON('invalid', true)).to.be.null;
      });
    });

    describe('split(str [, options])', function () {
      var str = 'a,b,c';

      it('should return an array with str as first element if not passed any options', function () {
        var result = coercers.after.split(str, true);
        expect(result).to.be.an.instanceOf(Array).and.have.property('length').that.equals(1);
        expect(result[0]).to.equal(str);
      });

      it('should split string by separator if options.separator is set', function () {
        var result = coercers.after.split(str, { separator: ',' });
        expect(result).to.be.an.instanceOf(Array).and.have.property('length').that.equals(3);
        expect(result[0]).to.equal('a');
        expect(result[1]).to.equal('b');
        expect(result[2]).to.equal('c');
      });

      it('should limit splits if options.limit is set', function () {
        var result = coercers.after.split(str, { separator: ',', limit: 2 });
        expect(result).to.be.an.instanceOf(Array).and.have.property('length').that.equals(2);
        expect(result[0]).to.equal('a');
        expect(result[1]).to.equal('b');
      });
    });
  });
});