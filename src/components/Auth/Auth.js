import "./Auth.scss";
import { auth, googleProvider } from "../../config/firebase"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, getRedirectResult, signInWithRedirect} from "firebase/auth"

export const Auth = () => {
    const [loginemail,setLoginEmail] = useState("");
    const [loginpassword,setLoginPassword] = useState("");
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    console.log(auth?.currentUser?.email);
   
    const signIn = async (event) => {
        try{
            event.preventDefault();
            await signInWithEmailAndPassword(
                auth,
                loginemail,
                loginpassword)
            navigate('/listpage');
        } catch(err){
          console.error(err);
        }
        
    };

    const signInWithGoogleRedirect = async () => {
        try{
            await signInWithRedirect(auth, googleProvider)
        } catch(err){
            console.error(err);
        }
        
    };

    const handleRedirectResult = async () => {
        try {
          
          const result = await getRedirectResult(auth);
          if (result) {
            setIsAuthenticated(true);
        }
        } catch (err) {
          console.error(err);
        }
      };

    useEffect(() => {
        handleRedirectResult();
        
      }, []);
    useEffect(() => {
        if (isAuthenticated) navigate('/listpage');
      }, [isAuthenticated, navigate]);

    return(
        <form className="auth">
            <div className="auth__border">
            
                <div className="auth__left">
                    <h3 className="auth__title"> Login</h3>           
                </div>
                <div>
                    <input 
                        placeholder="Email..." 
                        type="text"
                        className="input__sign-in"
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />
                </div>

                <div>
                    <input 
                        placeholder="Password..." 
                        type="password"
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                </div>
                
                <button className="auth__button-1"type="button" onClick={signIn}>Sign In</button>
                
            <div className="auth__inner-line"></div>

                <div>
                <button className="auth__button-2"type="button" onClick={signInWithGoogleRedirect}>Sign in with Google</button>
                </div>

            <div className="auth__inner-line"></div>

                <div className="auth__signup">
                    <div>
                        <h3 className="auth__account">Don't Have An Account?</h3>
                    </div>
                        <Link to={`/signup`}>
                            <div>
                                <button className="auth__button-3"> Sign Up</button>
                            </div>
                        </Link>
                </div>
            </div>
        </form>
    );
};