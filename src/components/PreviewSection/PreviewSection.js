import { useState, useEffect } from "react";
import PreviewItem from "../../components/PreviewItem/PreviewItem";
import "./PreviewSection.scss";
import { db, auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    onSnapshot,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import logo from '../../assets/logo/logoF.jpg'

export default function PreviewSection() {
    const [sectionArray, setSectionArray] = useState([]);
    const sectionCollectionRef = collection(db, "lists");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is authenticated with UID:", user.uid);
                const userId = user.uid;
    
                const querySection = query(
                    sectionCollectionRef,
                    where("userId", "==", userId),
                    orderBy("createdAt")
                );
    
                const unsubscribeSnapshot = onSnapshot(querySection, (snapshot) => {
                    const sectionArray = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    setSectionArray(sectionArray);
                });
    
                return () => unsubscribeSnapshot();
            } else {
                console.error("User is not authenticated");
            }
        });
    
        return () => unsubscribe();
    }, []);


    return (
        <div className="black">
            <div className="preview-logo">
      <img className="preview-logo__image"src={logo} alt="Logo" />
      </div>
      <div className="preview-body">
        <div className="preview-body__container">
          <div className="preview-section">
            <div>
                        {sectionArray.map((list) => {
                        return(
                            <div key={list.id}>
                            
                                    <>
                                    <div className="preview-section__name-container">
                                        <h1 className="preview-section__name">{list.title}</h1>
                                    </div>
                                    
                                    </>
                                
                                <PreviewItem list={list} id={list.id} />
                            </div>  
                        )})}
              </div>
             </div>
            </div>
          </div>
        </div>
    );
}