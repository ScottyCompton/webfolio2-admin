import {PortfolioCatItemProps} from '../interfaces'
import AppImage from '../components/UI/AppImage';
import {useAppSelector} from '../hooks/redux-hooks';
import { v4 as uuidv4 } from 'uuid';

const PortCatListItem:React.FC<PortfolioCatItemProps> = (props) => {
    const {portfolioItem, displayOrder, firstRow, lastRow, handleMoveUpClick, handleMoveDownClick, handleEditClick} = props;
    const {_id, previewImgUrl, projectTitle, published} = portfolioItem
    const portCats = useAppSelector(state => state.portfolio.categories);


    const listItemCats = portCats.filter((portCat) => {
        const csoArray = portfolioItem.cso;
        let inCat = false;
        csoArray.forEach((cso) => {
            if (cso.category_id === portCat._id) {
                inCat = true;
            }
        })
        return inCat;
    })

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
        if(_id) {
            handleEditClick(_id)
        }
        
    }

    return (

        <li onClick={doEdit} className="portCatList__item list-group-item d-flex justify-content-between align-items-center" style={{margin:'.2rem 0'}}>
            <div style={{width:'20rem'}}>
                { <AppImage
                id={`portCatList__image--${_id}`}  
                src={previewImgUrl}
                className="portCatList__image" /> }&nbsp; {projectTitle}
            </div>
            <div className="portCatList__categories">
                {listItemCats.map((cat, index) => {
                    return (<span key={uuidv4()}>{cat.category}{index !== listItemCats.length-1 && ', '}</span>)
                })
            }
            </div>

            <div className="portCatList__functions">
                {published && <span className="text-success">Published &nbsp; </span>}
                {!published && <span className="text-warning">Unpublished &nbsp;</span>}
                {!firstRow && <button type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Move Up" onClick={doMoveUp} id="moveUp" className="btn  btn-secondary portCatList__btn portCatList__btn--moveUp">v</button>}
                {firstRow && <button type="button" className="btn  btn-primary-disabled portCatList__btn portCatList__btn--moveUp"> &nbsp;</button>}
                {!lastRow && <button type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Move Down" onClick={doMoveDown} id="moveDown" className="btn portCatList__btn btn-dark portCatList__btn--moveDown">v</button>}
                {lastRow && <button type="button" className="btn  btn-primary-disabled portCatList__btn portCatList__btn--moveDown"> &nbsp;</button>}
            </div>
        </li>
    )

 
}

export default PortCatListItem;



