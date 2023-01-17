export function randomInteger(min, max) {
  if(!Number.isInteger(min) || !Number.isInteger(max) || min < 0 || max < 0)
    throw new Error(`Both min and max have to be positive integers, provided: '${min}', '${max}'.`);
  if(min > max)
    throw new Error(`Min cannot be greater than max, provided: '${min}', '${max}'.`);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleArray(arr) {
  if(!Array.isArray(arr))
    throw new Error(`You have to proivde an array, provided: '${arr}'.`);

  const copy = [...arr];
  const shuffled = [];

  while(copy.length)
    shuffled.push(copy.splice(randomInteger(0, copy.length - 1), 1)[0]);

  return shuffled;
}

export function stringifyPrice(price) {
  price = parseFloat(price);

  if(Number.isNaN(price) || price < 0)
    throw new Error(`First argument (price) has to be non-negative number or string that can be parsed to number, provided: '${price}' of type '${typeof price}'.`)

  return `$${(price / 100).toFixed(2)}`;
}

export function cutText(text, length) {
  if(typeof text !== 'string')
    throw new Error(`Frist argument (text) has to be string, provided: '${text}'.`);
  if(!Number.isInteger(length) || length < 0)
    throw new Error(`Second argument (length) has to be a non-negative integer, provided: '${length}.`);

  if(length === 0)
    return '';
  if(text.length <= length)
    return text;

  return `${text.slice(0, length)}...`;
}

export function sortArrayOfObjectsByProperty(arr, property, descendingOrder = false) {
  // sorts strings, won't work for numbers

  if(!Array.isArray(arr))
    throw new Error(`First argument has to be an array, provided: '${arr}'.`);
  if(!property || typeof property !== 'string')
    throw new Error(`Property has to be non-empty string, provided: '${property}'.`);

  const properties = arr.map(item => {
    if(typeof item[property] !== 'string')
      console.error(`Found property value that is not a string: '${item[property]}'. They array may be sorted in unexpected way.`);

    return item[property];
  });
  properties.sort();
  const sorted = [];
  
  for(let i = 0; i < properties.length; i++) {
    const index = arr.findIndex(item => item[property] === properties[i]);
    sorted.push(arr[index]);
    arr.splice(index, 1);
  }

  if(descendingOrder)
    sorted.reverse();

  return sorted;
}

export function stringChangeCharcter(str, index, newCharacter) {
  if(!str || typeof str !== 'string')
    throw new Error(`First argument (str) has to be an non-empty string, provided: ${str}`);
  if(!Number.isInteger(index) || index < 0)
    throw new Error(`Second argument (index) has to be a non-negative integer, provided: ${index}`);
  if(index >= str.length)
    throw new Error(`Tried to change character at index '${index}' (second argument), but the length of string (first argument) is only '${str.length}'.`);
  if(typeof  newCharacter !== 'string')
    throw new Error(`Third argument provided to this function has to be a string, provided: '${newCharacter}'.`);

  return str.slice(0, index) + newCharacter + str.slice(index + 1);
}

export function capitalize(str) {
  if(!str || typeof str !== 'string')
    throw new Error(`First argument (str) has to be a non-empty string, provided: ${str}`);

  let output = stringChangeCharcter(str, 0, str[0].toUpperCase());
    
  for(let i = 1; i < str.length; i++) {
    if(str[i - 1] === ' ')
      output = stringChangeCharcter(output, i, output[i].toUpperCase());
  }

  return output;
}

export function getColorName(color) {
  if(!color)
    return 'all';
    
  switch(color.toLowerCase()) {
    case '#ff0000':
      return 'red';

    case '#00ff00':
      return 'green';

    case '#0000ff':
      return 'blue';

    case '#ffb900':
      return 'orange';

    case '#000':
      return 'black';
      
    default:
      return 'unrecognized color';
  }
}

// export function spacesToCamelCase(text) {
//   if(typeof text !== 'string')
//     throw new Error('Text has to be a string!');

//   const arr = text.split(' ');

//   for(let i = 0; i < arr.length - 1; i++) {
//     if(arr[i] === ' ')
//       arr[i + 1] = arr[i + 1].toUpperCase();
//   }

//   return arr.filter(character => character !== ' ').join('');
// }

// export function arrayIsSubsetOf(subset, whole) {
//   if(!Array.isArray(subset) || !Array.isArray(whole))
//     throw new Error(`Non-array provided: firstArg: '${subset}', secondArg: '${whole}'`);

//   for(let i = 0; i < subset.length; i++)
//     if(!whole.includes(subset[i]))
//       return false;

//   return true;
// }

// export function verifyColorString(color, type = 'hex') {
//   if(type !== 'hex')
//     throw new Error(`Currently you can only verify 'hex' colors, provided type: '${type}'.`);
//   if(typeof color !== 'string')
//     throw new Error(`Color has to be a string, provided: '${color}'`);

//    always false

//   return color.startsWith('#') && color.length === 7 && !color.match(/[^0-9a-f]/)?.length;
// }