import "./SignInPage.scss";
import logo from '../../assets/logo/logoF.jpg'
import {Auth} from "../../components/Auth/Auth"

function SignInPage() {
  
  return (
    
    <div>
      <div className="logo">
      <img className="logo__image"src={logo} alt="Logo" />
      </div>
      <div className="login">
        <div className="space-1"></div>
        <Auth />
      </div>
    </div>
  );
}

export default SignInPage;