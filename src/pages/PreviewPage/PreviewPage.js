import PreviewSection from "../../components/PreviewSection/PreviewSection";
import "./PreviewPage.scss";
import logo from '../../assets/logo/logo.jpg'


function PreviewPage() {
  
  return (
    
    <div>
      <div className="logo">
      <img className="logo__image"src={logo} alt="Logo" />
      </div>
      <div className="body">
        <div className="body__container">
      <PreviewSection />
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;