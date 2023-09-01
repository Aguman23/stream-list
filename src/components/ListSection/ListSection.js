import { useState, useEffect } from "react";
import ListItem from "../../components/ListItem/ListItem";
import "./ListSection.scss";
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
        <div className="section">
            
            <input
                value={newListSection}
                placeholder="Add List"
                onChange={(e) => setNewListSection(e.target.value)}
            />
            <button onClick={onSubmitList}>Submit</button>
            <div>
                {sectionArray.map((list) => {
                    // console.log(list);
                return(
                    <div key={list.id}>
                        {editingSection === list.id ? (
                            <>
                                <input
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                                <button onClick={() => onSaveEdit(list.id)}>Submit</button>
                                <button onClick={() => setEditingSection(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h1>{list.title}</h1>
                                <button onClick={() => onDeleteSection(list.id)}>Delete</button>
                                <button onClick={() => onEditSection(list.id, list.title)}>Edit</button>
                            </>
                        )}
                        <ListItem list={list}/>
                    </div>  
                )})}
            </div>
        </div>
    );
}