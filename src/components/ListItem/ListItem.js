import { useState } from "react";
import "./ListItem.scss";
import { db } from "../../config/firebase";
import {
    collection,
    doc,
    updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

export default function ListItem({list, id}) {
    const [newTitleItem, setNewTitleItem] = useState("");
    const [newRateItem, setNewRateItem] = useState("");
    const [newCommentItem, setNewCommentItem] = useState("");
    const [editingSection, setEditingSection] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedRate, setEditedRate] = useState("");
    const [editedComment, setEditedComment] = useState("");
    
    const onSubmitList = async () => {

        if (newTitleItem === "" || newRateItem ==="" || newCommentItem==="") {
            return;
            }  
        
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

    return (
        <div className="item">
            
            <input
                value={newTitleItem}
                type="text"
                className="input__name"
                placeholder="Add a Title..."
                onChange={(e) => setNewTitleItem(e.target.value)}
            />
             <input
                value={newRateItem}
                type="text"
                className="input__name"
                placeholder="Give your Rating 1-10..."
                onChange={(e) => setNewRateItem(e.target.value)}
            />
             <input
                value={newCommentItem}
                type="text"
                className="input__name"
                placeholder="Add Comments..."
                onChange={(e) => setNewCommentItem(e.target.value)}
            />
            <button className="item__button-1" onClick={onSubmitList}>Submit</button>
            
            <div>
            
                {list.media && list.media.map((mediaItem) => (
                    
                    <div key={mediaItem.id}>
                        {editingSection === mediaItem.id ? (
                            <>
                                <input
                                    value={editedTitle}
                                    className="section input__name section__edit"
                                    type="text"
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                                <input
                                    value={editedRate}
                                    className="section input__name section__edit"
                                    type="text"
                                    onChange={(e) => setEditedRate(e.target.value)}
                                />
                                <input
                                    value={editedComment}
                                    className="section input__name section__edit"
                                    type="text"
                                    onChange={(e) => setEditedComment(e.target.value)}
                                />
                                <div className="pad">
                                <button className="item__button-2" onClick={() => onSaveEdit(mediaItem.id)}>Submit</button>
                                <button className="item__button-2" onClick={() => setEditingSection(null)}>Cancel</button>
                                </div>
                            </>
                        ) : (
                        
                            
                                <>
                                <div className="item__container" >
                                    <div className="item__items">
                                    <div>
                                    <h3 className="item__body">{mediaItem?.title}</h3>
                                    </div>
                                    <div>
                                    <h3 className="item__body">{mediaItem?.rate}/10</h3>
                                    </div>
                                    </div>
                                    <h3 className="item__body item__items-2">"{mediaItem?.comment}"</h3>
                                </div>
                                <div className="pad">
                                    <button className="item__button-2" onClick={() => onEditSection(mediaItem?.id, mediaItem?.title, mediaItem?.rate, mediaItem?.comment)}>Edit Entry</button>
                                    <button className="item__button-3" onClick={() => onDeleteSection(mediaItem?.id)}>Delete Entry</button>
                                </div>
                                </>
                            
                        )}
                    </div>  
                ))}
            </div>
        </div>
    );
}