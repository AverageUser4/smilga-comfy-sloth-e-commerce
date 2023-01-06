export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleArray(arr) {
  const copy = [...arr];
  const shuffled = [];

  while(copy.length)
    shuffled.push(copy.splice(randomInteger(0, copy.length - 1), 1)[0]);

  return shuffled;
}

export function stringifyPrice(price) {
  return `$${(price / 100).toFixed(2)}`;
}

export function cutText(text, length) {
  if(typeof text !== 'string' || text.length < 1)
    throw new Error('Text hast to be non-empty string!');
  if(!Number.isInteger(length) || length < 1)
    throw new Error('Length has to be a positive integer!');

  if(text.length <= length)
    return text;

  return `${text.slice(0, length)}...`;
}

export function spacesToCamelCase(text) {
  if(typeof text !== 'string')
    throw new Error('Text has to be a string!');

  const arr = text.split(' ');

  for(let i = 0; i < arr.length - 1; i++) {
    if(arr[i] === ' ')
      arr[i + 1] = arr[i + 1].toUpperCase();
  }

  return arr.filter(character => character !== ' ').join('');
}

export function arrayIsSubsetOf(subset, whole) {
  if(!Array.isArray(subset) || !Array.isArray(whole))
    throw new Error(`Non-array provided: firstArg: '${subset}', secondArg: '${whole}'`);

  for(let i = 0; i < subset.length; i++)
    if(!whole.includes(subset[i]))
      return false;

  return true;
}

export function sortArrayOfObjectsByProperty(arr, property, desc = false) {
  // sorts strings, won't work for numbers

  if(!Array.isArray(arr))
    throw new Error(`Non-array provided: '${arr}'.`);
  if(!property || typeof property !== 'string')
    throw new Error(`Property has to be non-empty string, provided: '${property}'.`);

  const properties = arr.map(item => item[property]);
  properties.sort();
  const sorted = [];
  
  for(let i = 0; i < properties.length; i++) {
    const index = arr.findIndex(item => item[property] === properties[i]);
    sorted.push(arr[index]);
    arr.splice(index, 1);
  }

  if(desc)
    sorted.reverse();

  return sorted;
}

export function stringChangeCharcter(str, index, newCharacter) {
  if(!str || typeof str !== 'string')
    throw new Error(`Only non-empty string is valid first argumen for this function, provided: ${str}`);
  if(!Number.isInteger(index))
    throw new Error(`Second argument (index) provided to this function has to be an integer, provided: ${index}`);
  if(index >= str.length)
    throw new Error(`Tried to change character at index '${index}', but the length of string is only '${str.length}'.`);
  if(typeof  newCharacter !== 'string')
    throw new Error(`Third argument provided to this function has to be a string, provided: '${newCharacter}'.`);

  return str.slice(0, index) + newCharacter + str.slice(index + 1);
}

export function capitalize(str) {
  if(!str || typeof str !== 'string')
    throw new Error(`Only non-empty strings are valid arguments for this function, provided: ${str}`);

  let output = stringChangeCharcter(str, 0, str[0].toUpperCase());
    
  for(let i = 1; i < str.length; i++) {
    if(str[i - 1] === ' ')
      output = stringChangeCharcter(output, i, output[i].toUpperCase());
  }

  return output;
}

// export function verifyColorString(color, type = 'hex') {
//   if(type !== 'hex')
//     throw new Error(`Currently you can only verify 'hex' colors, provided type: '${type}'.`);
//   if(typeof color !== 'string')
//     throw new Error(`Color has to be a string, provided: '${color}'`);

//    always false

//   return color.startsWith('#') && color.length === 7 && !color.match(/[^0-9a-f]/)?.length;
// }