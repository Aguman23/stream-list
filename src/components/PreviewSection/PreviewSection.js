import { useState, useEffect } from "react";
import PreviewItem from "../../components/PreviewItem/PreviewItem";
import "./PreviewSection.scss";
import { db, auth } from "../../config/firebase";
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
        const userId = auth?.currentUser?.uid;
        console.log("UserId: ", userId); // Log to see the value of userId
    
        if (!userId) {
            console.error("User is not authenticated");
            return;
        }
        const querySection = query(
            sectionCollectionRef,
            where("userId", "==", auth?.currentUser?.uid),
             orderBy("createdAt")
             );
        const unsubscribe = onSnapshot(querySection, (snapshot) => {
            const sectionArray = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setSectionArray(sectionArray);
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