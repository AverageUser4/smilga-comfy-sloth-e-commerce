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

export function fetchMockAddImplementation(fetch, returnValue, timeout = 20, shouldReject = false) {
  if(!fetch.mock)
    throw new Error('Provide mocked function as the first argument.');
  
  function timeoutCallback(resolve, reject, url) {
    if(shouldReject) {
      const error = new Error(returnValue.toString());
      error.url = url;
      reject(error);
    }
    resolve({ json: () => returnValue, url });
  }

  function implementation(url) {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => timeoutCallback(resolve, reject, url),
        timeout
      );
    });
  }
  
  return fetch.mockImplementation(implementation);
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms || 0));
}

export function mockBroadcastChannel() {
  global.BroadcastChannel = function() {
    return {
      postMessage: ()=>0,
      addEventListener: ()=>0,
      close: ()=>0
    };
  };
}