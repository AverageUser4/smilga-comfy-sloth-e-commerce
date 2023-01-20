import { 
  randomInteger, shuffleArray, stringifyPrice, cutText, sortArrayOfObjectsByProperty,
  stringChangeCharcter, capitalize, getColorName, setCookie, getCookie, deleteCookie,
  deleteAllCookies
} from '../utils/utils';

describe('randomInteger', () => {
  test('throws when invalid arguments are provided', () => {
    expect(() => randomInteger(-1, 1)).toThrow();
    expect(() => randomInteger(-5, -3)).toThrow();
    expect(() => randomInteger(5, 0)).toThrow();
    expect(() => randomInteger('a', 0)).toThrow();
    expect(() => randomInteger(0, 'a')).toThrow();
  });

  test('returns the same number if min === max', () => {
    for(let i = 0; i < 10; i++)
      expect(randomInteger(i, i)).toBe(i);
  });
  
  test('returns integer between min and max (both included)', () => {
    let random = randomInteger(0, 3);

    for(let i = 0; i < 20; i++) {
      expect(Number.isInteger(random)).toBeTruthy();
      expect(random).toBeGreaterThanOrEqual(0);
      expect(random).toBeLessThanOrEqual(3);

      random = randomInteger(0, 3);
    }
  });
});

describe('shuffleArray', () => {
  test('throws when non-array is provided', () => {
    expect(() => shuffleArray()).toThrow();
    expect(() => shuffleArray(1)).toThrow();
    expect(() => shuffleArray('a', 2)).toThrow();
  });

  test('does not modify original array', () => {
    const original = [1, 2, 3, 4, 5, 6];

    shuffleArray(original);

    expect(original).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('returned array has the same elements', () => {
    expect([]).toEqual([]);
    expect([1]).toEqual([1]);
    expect([1, 2, 3, 4]).toEqual(expect.arrayContaining([1, 2, 3, 4]));
    expect(['a', 7, {}, []]).toEqual(expect.arrayContaining(['a', 7, {}, []]));
  });
});

describe('stringifyPrice', () => {
  test('throws when invalid argument is provided', () => {
    expect(() => stringifyPrice()).toThrow();
    expect(() => stringifyPrice(-10)).toThrow();
    expect(() => stringifyPrice('x999')).toThrow();
  });

  test('returns expected output', () => {
    expect(stringifyPrice(0)).toBe('$0.00');
    expect(stringifyPrice(1)).toBe('$0.01');
    expect(stringifyPrice(1099)).toBe('$10.99');
    expect(stringifyPrice(309999)).toBe('$3099.99');
  });
});

describe('cutText', () => {
  test('throws when "text" argument is invalid', () => {
    expect(() => cutText(1, 5)).toThrow();
    expect(() => cutText({}, 5)).toThrow();
    expect(() => cutText(null, 5)).toThrow();
  });
  
  test('throws when "length" argument is invalid', () => {
    expect(() => cutText('abcde', 'x')).toThrow();
    expect(() => cutText('abcde', -5)).toThrow();
    expect(() => cutText('abcde')).toThrow();
  });

  test('returns the same string when "length" argument is greater than or equal "text.length"', () => {
    expect(cutText('', 1)).toBe('');
    expect(cutText('abc', 5)).toBe('abc');
    expect(cutText('abc', 3)).toBe('abc');
  });

  test('cuts string to expected length and adds "..." at the end if output string is not empty', () => {
    expect(cutText('abc', 0)).toBe('');
    expect(cutText('abc', 1)).toBe('a...');
    expect(cutText('abcdefgh', 5)).toBe('abcde...');
  });
});

describe('sortArrayOfObjectsByProperty', () => {
  function getSampleArray(sorting = 'none') {
    switch(sorting) {
      case 'ascending':
        return [
          { name: 'adam', age: 20 },
          { name: 'eva', age: 19 },
          { name: 'mario', age: 55 },
          { name: 'olaf', age: 33 }
        ];

      case 'descending':
        return [
          { name: 'olaf', age: 33 },
          { name: 'mario', age: 55 },
          { name: 'eva', age: 19 },
          { name: 'adam', age: 20 }
        ];

      default: 
        return [
          { name: 'eva', age: 19 },
          { name: 'olaf', age: 33 },
          { name: 'adam', age: 20 },
          { name: 'mario', age: 55 }
        ];
    }
  }

  test('throws when first argument (arr) is not an array', () => {
    expect(() => sortArrayOfObjectsByProperty('people', 'name')).toThrow();
    expect(() => sortArrayOfObjectsByProperty({}, 'name')).toThrow();
  });

  test('throws when second argument (property) is not a non-empty string', () => {
    expect(() => sortArrayOfObjectsByProperty(getSampleArray())).toThrow();
    expect(() => sortArrayOfObjectsByProperty(getSampleArray(), 7)).toThrow();
  });

  test('calls console.error when a property the object is sorted by is not a string', () => {
    jest.spyOn(console, 'error').mockImplementation(()=>0);

    const arr = getSampleArray();
    arr[0].name = 12345;
    arr[2] = { age: 55 };
    sortArrayOfObjectsByProperty(arr, 'name');

    expect(console.error).toHaveBeenCalledTimes(2);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('12345'));
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('undefined'));
    
    console.error.mockRestore();
  });

  test('sorts the array in expected order', () => {
    expect(sortArrayOfObjectsByProperty(getSampleArray(), 'name')).toEqual(getSampleArray('ascending'));
    expect(sortArrayOfObjectsByProperty(getSampleArray(), 'name', true)).toEqual(getSampleArray('descending'));
  });
});

describe('stringChangeCharacter', () => {
  test('throws when first argument (str) is not a non-empty string', () => {
    expect(() => stringChangeCharcter(1, 5, 'a')).toThrow();
    expect(() => stringChangeCharcter('', 5, 'a')).toThrow();
  });

  test('throws when second argument (index) is not a non-negative integer', () => {
    expect(() => stringChangeCharcter('abcde', '7', 'a')).toThrow();
    expect(() => stringChangeCharcter('abcde', -5, 'a')).toThrow();
  });

  test('throws when second argument (index) is greater than the index of the last character in the first argument (str)', () => {
    expect(() => stringChangeCharcter('abc', 10, 'a')).toThrow();
    expect(() => stringChangeCharcter('abc', 3, 'a')).toThrow();
  });

  test('throws when third argument (newCharacter) is not a string', () => {
    expect(() => stringChangeCharcter('abc', 1)).toThrow();
    expect(() => stringChangeCharcter('abc', 1, 3)).toThrow();
  });

  test('works as expected', () => {
    expect(stringChangeCharcter('adam', 0, 'e')).toBe('edam');
    expect(stringChangeCharcter('adam', 1, 'w')).toBe('awam');
    expect(stringChangeCharcter('adam', 3, 'r')).toBe('adar');
    expect(stringChangeCharcter('adam', 0, 'bana')).toBe('banadam');
    expect(stringChangeCharcter('adam', 2, 'ima')).toBe('adimam');
    expect(stringChangeCharcter('adam', 3, 'ma')).toBe('adama');
  });
});

describe('capitalize', () => {
  test('throws when first argument is not a non-empty string', () => {
    expect(() => capitalize()).toThrow();
    expect(() => capitalize('')).toThrow();
    expect(() => capitalize(55)).toThrow();
  });

  test('works as expected', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('abc')).toBe('Abc');
    expect(capitalize('a b c')).toBe('A B C');
    expect(capitalize('two  spaces')).toBe('Two  Spaces');
    expect(capitalize('aB Cd')).toBe('AB Cd');
    expect(capitalize('za .b p')).toBe('Za .b P');
    expect(capitalize('my pretty-long string :)')).toBe('My Pretty-long String :)');
  });
});

describe('getColorName', () => {
  test('returns "all" when first argument (color) is falsy', () => {
    expect(getColorName()).toBe('all');
    expect(getColorName('')).toBe('all');
    expect(getColorName(null)).toBe('all');
  });

  test('returns unrecognized color when first argument (color) does not represent supported color', () => {
    expect(getColorName('dog')).toEqual(expect.stringMatching(/unrecognized/i));
    expect(getColorName('cat')).toEqual(expect.stringMatching(/unrecognized/i));
  });

  test('returns color name if it is supported', () => {
    expect(getColorName('#000')).toBe('black');
    expect(getColorName('#ff0000')).toBe('red');
    expect(getColorName('#00ff00')).toBe('green');
  });
});

describe('cookies', () => {
  beforeEach(() => deleteAllCookies());
  
  test('deleteCookie', () => {
    expect(document.cookie).toBe('');
    document.cookie = 'name=adam';
    expect(document.cookie).toEqual(expect.stringContaining('name=adam'));

    deleteCookie('name');
    expect(document.cookie).toBe('');

    document.cookie = 'age=20';
    document.cookie = 'hobby=music';
    expect(document.cookie).toEqual(expect.stringContaining('age=20'));
    expect(document.cookie).toEqual(expect.stringContaining('hobby=music'));

    deleteCookie('hobby');
    expect(document.cookie).toEqual(expect.not.stringContaining('hobby=music'));
    expect(document.cookie).toEqual(expect.stringContaining('age=20'));

    deleteCookie('age');
    expect(document.cookie).toBe('');
  });

  test('deleteAllCookies', () => {
    expect(document.cookie).toBe('');
    expect(() => deleteAllCookies()).not.toThrow();
    document.cookie = 'name=adam';

    deleteAllCookies();
    expect(document.cookie).toBe('');

    document.cookie = 'age=20';
    document.cookie = 'hobby=music';
    deleteAllCookies();
    expect(document.cookie).toBe('');
  });

  test('setCookie', () => {
    expect(document.cookie).toBe('');
  
    setCookie('a', '1');
    expect(document.cookie).toEqual(expect.stringContaining('a=1'));

    setCookie('b', '2');
    expect(document.cookie).toEqual(expect.stringContaining('b=2'));
  });

  test('getCookie', () => {
    expect(document.cookie).toBe('');
  
    setCookie('a', '1');
    expect(getCookie('a')).toBe('1');

    setCookie('b', '2');
    expect(getCookie('a')).toBe('1');
    expect(getCookie('b')).toBe('2');

    expect(getCookie('c')).toBeUndefined();
  });
});