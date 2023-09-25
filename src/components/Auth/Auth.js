import { useState } from "react"

const Auth = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    const signIn = async () => {
        try{
            const response = await fetch('stream-list-d9c07.firebaseapp.com', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include', 
              });
        
              if (response.ok) {
                const data = await response.json();
                console.log('Authentication success:', data.user);
              } else {

                console.error('Authentication error');
              }
            } catch (error) {
              console.error('Error:', error);
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