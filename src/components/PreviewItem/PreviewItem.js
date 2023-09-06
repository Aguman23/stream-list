import "./PreviewItem.scss";
export default function PreviewItem({list, id}) {
    
    
    return (
        <div className="preview-item">
                        
            <div>
            
                {list.media && list.media.map((mediaItem) => (
                    
                    <div key={mediaItem.id}>
                                               
                            
                                <>
                                <div className="preview-item__container" >
                                    <div className="preview-item__items">
                                    <div>
                                    <h3 className="preview-item__body">{mediaItem?.title}</h3>
                                    </div>
                                    <div>
                                    <h3 className="preview-item__body">{mediaItem?.rate}/10</h3>
                                    </div>
                                    </div>
                                    <h3 className="preview-item__body preview-item__items-2">"{mediaItem?.comment}"</h3>
                                </div>
                                </>
                                                    
                    </div>  
                ))}
            </div>
        </div>
    );
}