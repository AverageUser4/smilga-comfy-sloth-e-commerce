import { useEffect } from 'react';

function useDocumentTitle(title) {
  useEffect(() => {
    if(!title)
      document.title = 'Comfy Sloth';
    else
      document.title = `Comfy Sloth | ${title}`;
  }, [title]);
}

export default useDocumentTitle;