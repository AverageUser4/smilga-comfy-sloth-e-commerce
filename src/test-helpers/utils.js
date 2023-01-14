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

export async function mockFetch(fetch, returnValue, timeout = 20, shouldReject = false) {
  if(!fetch.mock)
    throw new Error('Provide fetch!!!');
  
  function timeoutCallback(resolve, reject) {
    if(shouldReject)
      reject(returnValue);
    resolve(returnValue);
  }

  function implementation() {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => timeoutCallback(resolve, reject),
        timeout
      );
    });
  }
  
  fetch.mockImplementation(implementation);
}