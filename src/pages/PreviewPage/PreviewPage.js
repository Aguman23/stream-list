import PreviewSection from "../../components/PreviewSection/PreviewSection";
import "./PreviewPage.scss";
import React from 'react';
import html2canvas from 'html2canvas';
import Arrow from "../../assets/icons/left-chevron.png"
import { Link } from "react-router-dom";

function PreviewPage() {
  
  const printRef = React.useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('StreamList/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'StreamList.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    
    <div className="black">

      <div className="preview-ends-1">
      <Link to={`/`}>
      <div>
      <img className="preview-ends__back" src={Arrow} alt="Arrow" />
      </div>
      </Link>
      </div>

      <div ref={printRef}><PreviewSection /></div>
      
     
     <div className="preview-ends-2">
     
     <div>
     <button  type="button" onClick={handleDownloadImage} className="preview-ends__button">Download</button>
     </div>
     
     </div>
     
    </div>
  );
}

export default PreviewPage;