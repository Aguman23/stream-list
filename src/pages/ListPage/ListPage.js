import ListSection from "../../components/ListSection/ListSection";
import "./ListPage.scss";
import logo from '../../assets/logo/logo.jpg'


function ListPage() {
  
  return (
    
    <div>
      <div className="logo">
      <img className="logo__image"src={logo} alt="Logo" />
      </div>
      <div className="body">
      <ListSection />
      </div>
    </div>
  );
}

export default ListPage;