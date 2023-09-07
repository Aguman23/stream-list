import ListSection from "../../components/ListSection/ListSection";
import "./ListPage.scss";
import logo from '../../assets/logo/logoF.jpg'


function ListPage() {
  
  return (
    
    <div>
      <div className="logo">
      <img className="logo__image"src={logo} alt="Logo" />
      </div>
      <div className="body">
        <div className="body__container">
      <ListSection />
        </div>
      </div>
    </div>
  );
}

export default ListPage;