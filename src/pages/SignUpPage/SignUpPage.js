import "./SignUpPage.scss";
import logo from '../../assets/logo/logoF.jpg'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { auth } from "../../config/firebase"

function SignUpPage() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  
  const navigate = useNavigate();

  const register = async (event) => {
    try {
        event.preventDefault();
        await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
      );
      navigate('/listpage');
    } catch (err) {
      console.log(err);
    }
  };


  return (
    
    <div>
      <div className="logo">
      <img className="logo__image"src={logo} alt="Logo" />
      </div>

      <div className="space-2"></div>

      <div className="sign-up">
        <div className="sign-up__border">
          
          <div className="sign-up__center">
              <h3 className="sign-up__title"> Register User</h3>           
          </div>

           <div>
               <input 
                   placeholder="Email..."
                   type="text" 
                   className="input__sign-up"
                   onChange={(e) => setRegisterEmail(e.target.value)}
               />
           </div>
           <div>
               <input 
                   placeholder="Password..." 
                   type="password"
                   onChange={(e) => setRegisterPassword(e.target.value)}
               />
           </div>

           <button className="sign-up__button"type="button" onClick={register}>Create User</button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;

