import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {PdfViewer} from './components/pdf-viewer';

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext("2d");
      if(canvasCtxRef.current) {
        canvasCtxRef.current.font = "20px Georgia";
        canvasCtxRef.current.fillText("This is canvas", 10, 50)
        //Make canvas border
        canvasCtxRef.current.strokeRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageSrc) {
      return;
    }
    // Generate form data
    var buffer = Buffer.from(imageSrc.split(",")[1], 'base64')
    var blobBin = atob(imageSrc.split(",")[1]);
    var array = [];
    for (var i = 0; i < buffer.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }

    var file = new Blob([new Uint8Array(array)], { type: "image/jpg" });
    var formdata = new FormData();
    formdata.append("image", file);

    // Send the formData
    console.log(formdata.get("image"));
  };

var DOMURL = window.URL || window.webkitURL || window;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onloadend = (event) => {
      const src_image = new Image();
      src_image.onload = () => {
        if (canvasRef.current && canvasCtxRef.current) {
          canvasCtxRef.current.drawImage(src_image, 100, 100, 200, 200);
          // var imageData = canvasRef.current.toDataURL("image/jpg");
          // setImageSrc(imageData);
        }
      };
      src_image.src = event.target!.result as string;
    };
    const input: HTMLInputElement = event.target;
    reader.readAsDataURL(input!.files![0]);
  };

  return (
    <div className="App">
      <PdfViewer /> {/*  Needs to be integrated with handleInputChange */}
      <h1>Image capture test</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" id="input" onChange={handleInputChange} />
        <canvas
          id="canvas"
          width="1000" height="700"
          ref={canvasRef}
        >
        </canvas>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
