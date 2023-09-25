import { auth, googleProvider } from "../../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"

export const Auth = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    
    console.log(auth?.currentUser?.email);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('User state changed:', user);
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
  
        } catch(err){
            console.error(err);
        }
        
    };

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider)
  
        } catch(err){
            console.error(err);
        }
        
    };

    const logOut = async () => {
        try{
            await signOut(auth)
  
        } catch(err){
            console.error(err);
        }
        
    };

    return(
        <form>
             {currentUser ? ( 
                <div>
                    <p>Welcome, {currentUser.email}</p>
                </div>
            ) : null}
           
            <input 
                placeholder="Email..." 
                onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                placeholder="Password..." 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
            <button onClick={logOut}>Log Out</button>
        </form>
    );
};