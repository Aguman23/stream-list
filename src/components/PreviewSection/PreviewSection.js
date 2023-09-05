import { useState, useEffect } from "react";
import PreviewItem from "../../components/PreviewItem/PreviewItem";
import "./PreviewSection.scss";
import { db } from "../../config/firebase";
import {
    collection,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";

export default function ListSection() {
    const [newListSection, setNewListSection] = useState("");
    const [editingSection, setEditingSection] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [sectionArray, setSectionArray] = useState([]);
    const sectionCollectionRef = collection(db, "lists");

    useEffect(() => {
        const querySection = query(sectionCollectionRef, orderBy("createdAt"));
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
        try {
            await addDoc(sectionCollectionRef, {
                title: newListSection,
                media: [],
                createdAt: serverTimestamp(),
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
        <div className="preview-section">

            <div className="preview-section__container">
                <div className="preview-section__items">
                <h3 className="preview-section__body">Welcome to Stream List, a web application made for helping you recommend content to your friends and social networks.
                                                      Share your favorite movies and shows from all major streaming services. 
                                                      Start by creating lists and adding entries. 
                                                      Hit the preview button when your done, and download your list at the end of the preview page.</h3>
                </div>
            </div>

            <div className="preview-section__name-container-2">
            <h1 className="preview-section__name-2">Create Your Lists</h1>
            </div>
            <div>
            <input
                className="preview-section__add-list"
                type="text"
                value={newListSection}
                placeholder="List Name..."
                onChange={(e) => setNewListSection(e.target.value)}
            />
            </div>
            <div>
            <button className="preview-section__button-1" onClick={onSubmitList}> + Create List</button>
            </div>
            <div>
                {sectionArray.map((list) => {
                return(
                    <div key={list.id}>
                        {editingSection === list.id ? (
                            <>
                                <input
                                    className="preview-section preview-section__edit"
                                    value={editedTitle}
                                    type="text"
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                                <div className="pad">
                                <button className="preview-section__button-2" onClick={() => onSaveEdit(list.id)}>Submit</button>
                                <button className="preview-section__button-2" onClick={() => setEditingSection(null)}>Cancel</button>
                                </div>
                            </>
                        ) : (
                            <>
                            <div className="preview-section__name-container">
                                <h1 className="preview-section__name">{list.title}</h1>
                            </div>
                            <div className="pad">
                                <button className="preview-section__button-2" onClick={() => onEditSection(list.id, list.title)}>Edit Name</button>
                                <button className="preview-section__button-2" onClick={() => onDeleteSection(list.id)}>Delete List</button>
                            </div>
                            </>
                        )}
                        <PreviewItem list={list} id={list.id} />
                    </div>  
                )})}
            </div>
        </div>
    );
}