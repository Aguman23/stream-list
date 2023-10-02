import { useState, useEffect } from "react";
import ListItem from "../../components/ListItem/ListItem";
import "./ListSection.scss";
import { db, auth } from "../../config/firebase";
import { Link } from "react-router-dom";
import {
    collection,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    addDoc,
    deleteDoc,
    doc,
    where,
    updateDoc,
} from "firebase/firestore";

export default function ListSection() {
    const [newListSection, setNewListSection] = useState("");
    const [editingSection, setEditingSection] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
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

    const onSubmitList = async () => {
        
        if (newListSection === "") {
        return;
        }        
        try {
            await addDoc(sectionCollectionRef, {
                title: newListSection,
                media: [],
                createdAt: serverTimestamp(),
                userId: auth?.currentUser?.uid,
            });
            setNewListSection("");
            
        } catch (err) {
            console.error(err);
        }
    
    };

    const onDeleteSection = async (sectionId) => {
        try {
            await deleteDoc(doc(sectionCollectionRef, sectionId));
            
        } catch (err) {
            console.error(err);
        }
    };

    const onEditSection = (sectionId, currentTitle) => {
        setEditingSection(sectionId);
        setEditedTitle(currentTitle);
    };

    const onSaveEdit = async (sectionId) => {
        try {
            await updateDoc(doc(sectionCollectionRef, sectionId), {
                title: editedTitle,
            });
            setEditingSection(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="section">

            <div className="section__container">
                <div className="section__items">
                <h3 className="section__body">Welcome to Stream List, a web application made for helping you recommend content to your friends and social networks.
                                              Share your favorite movies and shows from all major streaming services. 
                                              Start by creating lists and adding entries. 
                                              Hit the preview button when your done, and download your list at the end of the preview page.</h3>
                </div>
            </div>

            <div className="section__name-container-2">
            <h1 className="section__name-2">Create Your Lists</h1>
            </div>
            
            <div className="">
            <input
                className="section__add-list"
                type="text" required
                value={newListSection} 
                placeholder="List Name..."
                onChange={(e) => setNewListSection(e.target.value)}
            />
            </div>
            <div>
            <button className="section__button-1" onClick={onSubmitList}> + Create List</button>
            </div>
            <div>
                {sectionArray.map((list) => {
                return(
                    <div key={list.id}>
                        {editingSection === list.id ? (
                            <>
                                <input
                                    className="section section__edit"
                                    value={editedTitle}
                                    type="text"
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                                <div className="pad">
                                <button className="section__button-2" onClick={() => onSaveEdit(list.id)}>Submit</button>
                                <button className="section__button-2" onClick={() => setEditingSection(null)}>Cancel</button>
                                </div>
                            </>
                        ) : (
                            <>
                            <div className="section__name-container">
                                <h1 className="section__name">{list.title}</h1>
                            </div>
                            <div className="pad">
                                <button className="section__button-2" onClick={() => onEditSection(list.id, list.title)}>Edit Name</button>
                                <button className="section__button-2" onClick={() => onDeleteSection(list.id)}>Delete List</button>
                            </div>
                            </>
                        )}
                        <ListItem list={list} id={list.id} />
                    </div>  
                )})}
            </div>
            <Link to={`/preview`}>
            <div>
            <button className="section__button-3">Preview</button>
            </div>
            </Link>
        </div>
    );
}