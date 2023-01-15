import {FC} from 'react';
import useDocument from '../../hooks/useDocument';
import './pdf-viewer.scss';

export const PdfViewer : FC = () => {

  const { pages } = useDocument({
    //Test data
    url: "https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf"
  });

  console.log(pages);
  return (
    <div className='viewer'>
      {
        pages.map((canvasURL, idx) => {
          return <img src={canvasURL} key={idx} />
        })
      }
    </div>
  )
}