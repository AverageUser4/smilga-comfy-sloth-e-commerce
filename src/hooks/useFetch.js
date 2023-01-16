import { useState, useEffect } from 'react';

/*
  url - url of resource
  parseJSON - bool indicating whether data should be parsed with data.json()
*/
function useFetch(url, parseJSON = true) {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        setIsFetching(true);

        let data = await fetch(url);
        if(parseJSON)
          data = await data.json();
  
        if(ignore)
          return;
  
        setData(data);
      } catch(error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsFetching(false);
      }
    }

    fetchData();

    return () => ignore = true;
  }, [url, parseJSON]);

  return { isFetching, isError, data };
}

export default useFetch;