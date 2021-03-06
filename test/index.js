import { assert } from 'chai';
import t from '../src';
// import printAllMatchedTypes from '../src/util';

describe('Defined/Undefined', () => {
  const obj = {
    goodKey: 'hooray'
  };

  it('should test if object/key is defined', () => {
    assert(t(obj.goodKey).isDefined === true, 'Defined check didn\'t work :(');
    assert(t(obj.goodKey).isUndefined === false);
  });

  it('should test if nested object/key is defined', () => {
    const deepObj = {
      nestedKey: {
        goodKey: 'hello',
        numberKey: 10,
        zeroKey: 0,
        objKey: {}
      }
    };
    assert(t(deepObj, 'nestedKey.goodKey').isDefined === true, 'Nested Defined check didn\'t work :(');
    assert(t(deepObj, 'nestedKey.goodKey').isUndefined === false);
    assert(t(deepObj, 'nestedKey.goodKey').isString === true);
    assert(t(deepObj, 'nestedKey.numberKey').isNumber === true);
    assert(t(deepObj, 'nestedKey.numberKey').isTruthy === true);
    assert(t(deepObj, 'nestedKey.numberKey').isFalsy === false);
    assert(t(deepObj, 'nestedKey.zeroKey').isNumber === true);
    assert(t(deepObj, 'nestedKey.zeroKey').isTruthy === false);
    assert(t(deepObj, 'nestedKey.zeroKey').isFalsy === true);
    assert(t(deepObj, 'nestedKey.objKey').isDefined === true);
    assert(t(deepObj, 'nestedKey.objKey').isUndefined === false);
    assert(t(deepObj, 'nestedKey.objKey').isObject === true);
    assert(t(deepObj, 'nestedKey.objKey').isFunction === false);
    assert(t(deepObj, 'nestedKey.objKey').isArray === false);
  });

  it('should test if object/key is undefined', () => {
    assert(t(obj.badKey).isUndefined === true, 'Undefined check didn\'t work :(');
    assert(t(obj.badKey).isDefined === false);
  });

  it('should test if nested object/key is undefined', () => {
    assert(t(obj, 'badKey.superBadKey').isUndefined === true, 'Nested Undefined check didn\'t work :(');
    assert(t(obj, 'badKey.superBadKey').isDefined === false);
  });
});

describe('Null', () => {
  it('should test if object is null', () => {
    const obj = null;
    assert(t(obj).isNull === true, 'Null check didn\'t work :(');
  });
});

describe('Null or Undefined', () => {
  it('should test if object is null', () => {
    const nullObj = null;
    assert(t(nullObj).isNullOrUndefined === true, 'NullOrUndefined check didn\'t work :(');
    const obj = {
      goodKey: 'hooray'
    };
    assert(t(obj.badKey).isNullOrUndefined === true, 'NullOrUndefined check didn\'t work :(');
  });
});

describe('Truthy/Falsy', () => {
  it('should test if object is truthy', () => {
    const truthyValues = ['hey', 11, {}, { yo: 'yoyo' }, true, [], [1, 2]];
    truthyValues.map((value) => {
      assert(t(value).isTruthy === true, 'Truthy check didn\'t work :(');
      assert(t(value).isFalsy === false, 'Truthy check didn\'t work :(');
      return value;
    });
  });

  it('should test if object is falsy', () => {
    const mockObj = { goodKey: 'hello' };
    const falsyValues = ['', 0, null, mockObj.badKey, false, NaN];
    falsyValues.map((value) => {
      assert(t(value).isFalsy === true, 'Falsy check didn\'t work :(');
      assert(t(value).isTruthy === false, 'Falsy check didn\'t work :(');
      return value;
    });
  });
});

describe('Type', () => {
  it('should test if type is object', () => {
    const obj = {};
    assert(t(obj).isObject === true, 'Object check didn\'t work :(');
  });

  it('should test if object is empty', () => {
    const obj = {};
    assert(t(obj).isEmptyObject === true, 'Empty Object check didn\'t work :(');
  });

  it('should test if type is string', () => {
    const obj = 'hello';
    assert(t(obj).isString === true, 'String check didn\'t work :(');
  });

  it('should test if string is empty string', () => {
    const obj = '';
    assert(t(obj).isEmptyString === true, 'EmptyString check didn\'t work :(');
  });

  it('should test if type is Number', () => {
    const obj = 22;
    assert(t(obj).isNumber === true, 'Number check didn\'t work :(');
  });

  it('should test if type is Boolean', () => {
    const trueObj = true;
    assert(t(trueObj).isBoolean === true, 'Boolean check didn\'t work :(');
    const falseObj = false;
    assert(t(falseObj).isBoolean === true, 'Boolean check didn\'t work :(');
  });

  it('should test if object is true', () => {
    const obj = true;
    assert(t(obj).isTrue === true, 'True check didn\'t work :(');
  });

  it('should test if object is false', () => {
    const obj = false;
    assert(t(obj).isFalse === true, 'True check didn\'t work :(');
  });

  it('should test if type is Array', () => {
    const obj = ['Howdy!'];
    assert(t(obj).isArray === true, 'Array check didn\'t work :(');
    assert(t(obj).isObject === false, 'Array check didn\'t work :(');
  });

  it('should test if Array is Empty Array', () => {
    const obj = [];
    assert(t(obj).isEmptyArray === true, 'Empty Array check didn\'t work :(');
  });

  it('should test if type is Function', () => {
    const func = () => {};
    assert(t(func).isFunction === true, 'Function check didn\'t work :(');
  });
});

describe('Monkey Test', () => {
  it('should not throw error for any input', () => {
    const mockObj = { goodKey: 'hello' };
    const monkeyInputs = [
      1, 0, -1, '', 'hey', true, false, {}, { yo: 'yoyo' },
      [], [1, 2], null, undefined, mockObj.goodKey, mockObj.badKey,
      NaN, () => {}, Error, new Error(), Object,
    ];
    monkeyInputs.map((input) => {
      assert.doesNotThrow(() => t(input), 'Monkey test caught something!');
      return input;
    });
  });
});
