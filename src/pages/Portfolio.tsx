import {useAppSelector} from '../hooks/redux-hooks';
import {useState, useEffect} from 'react';
import {useAppDispatch} from '../hooks/redux-hooks';
import {Container, Row, Col} from 'react-bootstrap';
import CatSelect from '../components/UI/CatSelect';
import {SortablePortfolioItem} from '../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { useHistory, withRouter } from "react-router-dom";
import {portfolioActions_moveCso, portfolioActions_loadPortfolioData, portfolioActions_loadCategoryData} from '../appData/portfolioActions';
import PortCatListItem from '../components/PortCatListItem';


const PortCatList:React.FC = () => {
    const portCats = useAppSelector(state => state.portfolio.categories);
    const dispatch = useAppDispatch();
    const [categoryId, setCategoryId] = useState(portCats.length ? portCats[0]._id : '');
    const portfolio = useAppSelector(state => state.portfolio.items);
    let filteredList:SortablePortfolioItem[] = [];
    const history = useHistory();

    useEffect(() => {
            if (!portCats || portCats.length === 0) {
                                
                dispatch(portfolioActions_loadCategoryData((x:any) => {
                    setCategoryId(x[0]._id);
                }))
            .then(() => {
                dispatch(portfolioActions_loadPortfolioData())
            });    
        }

    }, [dispatch, portCats, categoryId])     



    const showPortfolioItems = (catId: string) => {
        setCategoryId(catId);
    }


    const handleEditClick = (id:string) => {
        history.push('/portfolio/' + id)
    }
    
    const handleMoveUpClick = (displayOrder: number) => {
        const portfolioId = filteredList[displayOrder]._id;
        const adjacentId =  filteredList[displayOrder - 1]._id;
        dispatch(portfolioActions_moveCso(portfolioId!, adjacentId!, categoryId, 'moveup'));
    }


    const handleMoveDownClick = (displayOrder: number) => {
        const portfolioId = filteredList[displayOrder]._id;
        const adjacentId =  filteredList[displayOrder + 1]._id;
        dispatch(portfolioActions_moveCso(portfolioId!, adjacentId!, categoryId, 'movedown'));
    }

    const displayFilteredCats = () => {
        portfolio.filter((item, index) => {
            // I have to do this BS because my CSO (category sort order) array looks like this:
            // cso - [key] - [{_id:laksdjflsj, categoryId: laksdjflasjdf, sortOrder: 3}]
            // and the categoryId cooresponds to the _id of the category in the "categories" collection.
    
            for(let key in Object.keys(item.cso)) {
                let csoItem = item.cso[key];
                if(csoItem.category_id === categoryId) {
                    filteredList.push({...item, displayOrder:csoItem.displayOrder})
                    return true;
                }
            }
            return false;
        })
    
        filteredList.sort((a:SortablePortfolioItem, b:SortablePortfolioItem) => {
            const valA = +a.displayOrder;
            const valB = +b.displayOrder;
            if(valA > valB) return 1;
            if(valA < valB) return -1;
            return 0;
        })
    

        if(filteredList.length > 0){
            return (
                <>    
                <ul className="portCatList list-group">
                    {filteredList && filteredList.map((item:SortablePortfolioItem, index:number) => {
                        return (
                        <PortCatListItem 
                            key={uuidv4()}
                            portfolioItem={item}
                            displayOrder={index}
                            handleMoveUpClick={handleMoveUpClick}
                            handleMoveDownClick={handleMoveDownClick}
                            handleEditClick={handleEditClick}
                            firstRow={index===0}
                            lastRow={index===filteredList.length-1}
                        />)
                    })}                
                </ul>
                </>
             );
        } else {
            return <></>
        }    
    }

    return (
        <Container>
            <Row>
                <Col xs="9"><h5 className="float-right">Select Category:</h5></Col>
                <Col xs="3"><CatSelect onChangeHandler={showPortfolioItems} catId={categoryId}  /></Col>                
            </Row>
            <Row>
                <Col xs="12">
                {displayFilteredCats()}
                </Col>
                
            </Row>
        </Container>
        
    );

}

export default withRouter(PortCatList);

