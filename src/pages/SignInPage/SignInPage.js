import "./SignInPage.scss";
import logo from '../../assets/logo/logoF.jpg'
import {Auth} from "../../components/Auth/Auth"

function SignInPage() {
  
  return (
    
    <div>
      <div className="logo2">
      {/* <img className="logo__image2"src={logo} alt="Logo" /> */}
      </div>
      <div className="body2">
        <div className="body__container2">
        <Auth />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;