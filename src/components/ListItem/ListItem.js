import { useState, useEffect } from "react";
import "./ListItem.scss";
import { db } from "../../config/firebase";
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

export default function ListItem({list, id}) {
    // console.log(list.media);
    const [newTitleItem, setNewTitleItem] = useState("");
    const [newRateItem, setNewRateItem] = useState([]);
    const [newCommentItem, setNewCommentItem] = useState("");
    const [editingSection, setEditingSection] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedRate, setEditedRate] = useState("");
    const [editedComment, setEditedComment] = useState("");
    
    
    useEffect(() => {
        const itemCollectionRef = collection(db, "lists");
        const queryItem = query(itemCollectionRef, orderBy("createdAt"));
        const unsubscribe = onSnapshot(queryItem, (snapshot) => {
            const itemArray = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            
        });

        return () => unsubscribe();
    }, []);


    const onSubmitList = async () => {
        // console.log('working');
        const itemCollectionRef = collection(db, "lists");

        try {
            await updateDoc(doc(itemCollectionRef, id), {
                media: [
                    ...list.media,
                    {
                        title: newTitleItem,
                        rate: newRateItem,
                        comment: newCommentItem,
                        id: uuidv4(),
                    }
                ]
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
            const filteredList = list.media.filter(item => {
                return item.id !== itemId
            })
            // console.log(itemId);
            // console.log(filteredList);

            await updateDoc(doc(itemCollectionRef, id), {
                media: [
                    ...filteredList,
                ]
            });
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

    // const onSaveEdit = async (itemId) => {
    //     const itemCollectionRef = collection(db, "lists");

    //     try {
    //         await updateDoc(doc(itemCollectionRef, itemId), {
    //             title: editedTitle,
    //             rate: editedRate,
    //             comment: editedComment,
    //         });
    //         setEditingSection(null);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const onSaveEdit = async (itemId) => {
        const itemCollectionRef = collection(db, "lists");
    
        try {
            const updatedMedia = list.media.map((mediaItem) => {
                if (mediaItem.id === itemId) {
                    return {
                        ...mediaItem,
                        title: editedTitle,
                        rate: editedRate,
                        comment: editedComment,
                    };
                }
                return mediaItem;
            });
    
            await updateDoc(doc(itemCollectionRef, id), {
                media: updatedMedia,
            });
    
            setEditingSection(null);
        } catch (err) {
            console.error(err);
        }
    };

    // const onSaveEdit = async () => {
    //     const itemCollectionRef = collection(db, "lists");

    //     try {     
    //         await updateDoc(doc(itemCollectionRef, id), {
    //             media: [
    //                 ...list.media,
    //                 {
    //                     title: editedTitle,
    //                     rate: editedRate,
    //                     comment: editedComment,
    //                 }
    //             ]    
    //         });
    //         setEditingSection(null);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };



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
                type="text"
                placeholder="Add Title"
                onChange={(e) => setNewTitleItem(e.target.value)}
            />
             <input
                value={newRateItem}
                type="text"
                placeholder="Give your Rate 1-10"
                onChange={(e) => setNewRateItem(e.target.value)}
            />
             <input
                value={newCommentItem}
                type="text"
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
                                    type="text"
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    // onChange={(e) => updateValue(e.target.value, item.id)}
                                />
                                <input
                                    value={editedRate}
                                    type="text"
                                    onChange={(e) => setEditedRate(e.target.value)}
                                />
                                <input
                                    value={editedComment}
                                    type="text"
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