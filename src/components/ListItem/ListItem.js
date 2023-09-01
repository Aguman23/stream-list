import { useState, useEffect } from "react";
import "./ListItem.scss";
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

export default function ListItem({list}) {
    // console.log(list.media);
    const [newTitleItem, setNewTitleItem] = useState("");
    const [newRateItem, setNewRateItem] = useState([]);
    const [newCommentItem, setNewCommentItem] = useState("");
    const [editingSection, setEditingSection] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedRate, setEditedRate] = useState("");
    const [editedComment, setEditedComment] = useState("");
    const [itemArray, setItemArray] = useState([]);
    
    useEffect(() => {
        const itemCollectionRef = collection(db, "lists");
        const queryItem = query(itemCollectionRef, orderBy("createdAt"));
        const unsubscribe = onSnapshot(queryItem, (snapshot) => {
            const itemArray = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setItemArray(itemArray);
            // console.log(itemArray);
        });

        return () => unsubscribe();
    }, []);

    const onSubmitList = async () => {
        const itemCollectionRef = collection(db, "lists");

        try {
            await addDoc(itemCollectionRef, {
                title: newTitleItem,
                rate: newRateItem,
                comment: newCommentItem,
                createdAt: serverTimestamp(),
            });
            setNewTitleItem("");
            setNewRateItem("");
            setNewCommentItem("");
            
        } catch (err) {
            console.error(err);
        }
    };

    const onDeleteSection = async (itemId) => {
        const itemCollectionRef = collection(db, "lists");

        try {
            await deleteDoc(doc(itemCollectionRef, itemId));
            
        } catch (err) {
            console.error(err);
        }
    };

    const onEditSection = (itemId, currentTitle, currentRate, currentComment) => {
        setEditingSection(itemId);
        setEditedTitle(currentTitle);
        setEditedRate(currentRate);
        setEditedComment(currentComment);
    };

    const onSaveEdit = async (itemId) => {
        const itemCollectionRef = collection(db, "lists");

        try {
            await updateDoc(doc(itemCollectionRef, itemId), {
                title: editedTitle,
                rate: editedRate,
                comment: editedComment,
            });
            setEditingSection(null);
        } catch (err) {
            console.error(err);
        }
    };

    // const updateValue = (value, id) => {
    //     const updatedArray = itemArray.map(item => {
    //         if (item.id === id) {
    //             item.title = value;
    //         }
    //         return item;
    //     })
    //     console.log(updatedArray);
    //     setItemArray(updatedArray);
    // }

    return (
        <div className="section">
            
            <input
                value={newTitleItem}
                placeholder="Add Title"
                onChange={(e) => setNewTitleItem(e.target.value)}
            />
             <input
                value={newRateItem}
                placeholder="Give your Rate 1-10"
                onChange={(e) => setNewRateItem(e.target.value)}
            />
             <input
                value={newCommentItem}
                placeholder="Add Comments"
                onChange={(e) => setNewCommentItem(e.target.value)}
            />
            <button onClick={onSubmitList}>Submit</button>
            
            <div>
            
                {list.media && list.media.map((mediaItem) => (
                    
                    <div key={mediaItem.id}>
                        {editingSection === mediaItem.id ? (
                            <>
                                <input
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    // onChange={(e) => updateValue(e.target.value, item.id)}
                                />
                                <input
                                    value={editedRate}
                                    onChange={(e) => setEditedRate(e.target.value)}
                                />
                                <input
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                />
                                <button onClick={() => onSaveEdit(mediaItem.id)}>Submit</button>
                                <button onClick={() => setEditingSection(null)}>Cancel</button>
                            </>
                        ) : (
                        
                            
                                <>
                                    <h3>{mediaItem?.title}</h3>
                                    <h3>{mediaItem?.rate}</h3>
                                    <h3>{mediaItem?.comment}</h3>
                                    <button onClick={() => onDeleteSection(mediaItem?.id)}>Delete</button>
                                    <button onClick={() => onEditSection(mediaItem?.id, mediaItem?.title, mediaItem?.rate, mediaItem?.comment)}>Edit</button>
                                </>
                            
                        )}
                    </div>  
                ))}
            </div>
        </div>
    );
}