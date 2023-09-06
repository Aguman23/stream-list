import PreviewSection from "../../components/PreviewSection/PreviewSection";
import "./PreviewPage.scss";

function PreviewPage() {
  
  return (
    
    <div>

      <div className="preview-ends-1">
      <div>
      {/* Image */}
      <p>&#60;--</p>
      </div>
      </div>

      <PreviewSection />
     
     <div className="preview-ends-2">
     <div>
     <button className="preview-ends__button">Download</button>
     </div>
     </div>
     
    </div>
  );
}

export default PreviewPage;