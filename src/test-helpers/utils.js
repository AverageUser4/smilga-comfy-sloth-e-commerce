export function resize({ width, height }) {
  if(!width && !height)
    throw new Error('You need to provide at least width or height.');
  if((width && !Number.isInteger(width)) || (height && !Number.isInteger(height)))
    throw new Error(`Only integers are accepted, provided: '${width}', '${height}'.`);

  if(width) {
    window.innerWidth = width;
    window.outerWidth = width;
  }
  if(height) {
    window.innerHeight = height;
    window.outerHeight = height;
  }

  window.dispatchEvent(new Event('resize'));
}