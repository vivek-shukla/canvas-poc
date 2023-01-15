import { useState, useEffect } from 'react';
import {PageParam, getDocumentPages} from '../api/getDocumentPages';

export default ({
  url
}: PageParam) => {
  const [pages, setPages] = useState<string[]>([]);
  useEffect(() => {
    const getPages = async () => {
      const canvases = await getDocumentPages({
        url
      });
      setPages(canvases);
    }
    getPages();
  }, [url])
  return {
    pages
  }
}