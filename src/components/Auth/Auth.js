import { auth, googleProvider } from "../../config/firebase"
import { createUserWithEmailAndPassword, getRedirectResult, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    


    console.log(auth?.currentUser?.email);
   
    const signIn = async (event) => {
        try{
            event.preventDefault();
            await createUserWithEmailAndPassword(auth, email, password)
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
                       
            <input 
                placeholder="Email..." 
                onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                placeholder="Password..." 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <button type="button" onClick={signIn}>Sign In</button>
            <button type="button" onClick={signInWithGoogleRedirect}>Sign In With Google</button>
            <button type="button" onClick={logOut}>Log Out</button>
        </form>
    );
};