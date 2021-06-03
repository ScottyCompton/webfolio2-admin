import {PortfolioCatItemProps} from '../interfaces'


const PortCatListItem:React.FC<PortfolioCatItemProps> = (props) => {
    const {portfolioItem, displayOrder, firstRow, lastRow, handleMoveUpClick, handleMoveDownClick, handleEditClick} = props;
    const {_id, previewImgUrl, projectTitle, published} = portfolioItem

    const doMoveUp = () => {
        handleMoveUpClick(displayOrder)
    }
    
    const doMoveDown = () => {
        handleMoveDownClick(displayOrder)
    }

    const doEdit = (e: any) => {
        if(e.target.classList.contains('btn')) {
            return false;
        };
        handleEditClick(_id)
    }

    return (

        <li onClick={doEdit} className="portCatList__item list-group-item d-flex justify-content-between align-items-center" style={{margin:'.2rem 0'}}>
            <div style={{width:'20rem'}}>
                <img className="portCatList__image" src={previewImgUrl} alt={projectTitle} />&nbsp; {projectTitle}
            </div>
            <div>
                {published && <span className="text-success">Published &nbsp; </span>}
                {!published && <span className="text-warning">Unpublished &nbsp;</span>}
                {!firstRow && <button type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Move Up" onClick={doMoveUp} id="moveUp" className="btn  btn-secondary portCatItem__btn portCatItem__btn--moveUp">v</button>}
                {firstRow && <button type="button" className="btn  btn-primary-disabled portCatItem__btn portCatItem__btn--moveUp"> &nbsp;</button>}
                {!lastRow && <button type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Move Down" onClick={doMoveDown} id="moveDown" className="btn portCatItem__btn btn-dark portCatItem__btn--moveDown">v</button>}
                {lastRow && <button type="button" className="btn  btn-primary-disabled portCatItem__btn portCatItem__btn--moveDown"> &nbsp;</button>}
            </div>
        </li>
    )

 
}

export default PortCatListItem;



