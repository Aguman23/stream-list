import { auth, googleProvider } from "../../config/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getRedirectResult, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const [loginemail,setLoginEmail] = useState("");
    const [loginpassword,setLoginPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    console.log(auth?.currentUser?.email);
   
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

    const logOut = async (event) => {
        try{
            event.preventDefault();
            await signOut(auth)
            navigate('/');
        } catch(err){
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
        <form>
            <h3> Register User</h3>
            <input 
                placeholder="Email..." 
                onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input 
                placeholder="Password..." 
                type="password"
                onChange={(e) => setRegisterPassword(e.target.value)}
            />

            <button type="button" onClick={register}>Create User</button>

            <h3> Login User</h3>           
            <input 
                placeholder="Email..." 
                onChange={(e) => setLoginEmail(e.target.value)}
            />

            <input 
                placeholder="Password..." 
                type="password"
                onChange={(e) => setLoginPassword(e.target.value)}
            />
            
            <button type="button" onClick={signIn}>Sign In</button>
            <button type="button" onClick={signInWithGoogleRedirect}>Sign In With Google</button>
            <button type="button" onClick={logOut}>Log Out</button>
        </form>
    );
};