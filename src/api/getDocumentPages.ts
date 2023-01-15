export type PageParam = {
    scale?: number;
    url: string
  }
  
  export const getDocumentPages = async ({scale = 1, url}: PageParam) : Promise<Array<string>> => {
    const PDFJS = window.pdfjsLib;
  
    // Load the document using getDocument utility
    const loadingTask = PDFJS.getDocument(url);
    const pdf = await loadingTask.promise;
    const { numPages } = pdf;
    const canvasURLs = [];
    // Add every page as canvas url
    for (let i = 0; i < numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const viewport = page.getViewport(scale);
      const { width, height } = viewport;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.className = 'page'
      await page.render({
        canvasContext: canvas.getContext('2d'),
        viewport
      })
  
      canvasURLs.push(canvas.toDataURL());
    }
    return canvasURLs;
  }