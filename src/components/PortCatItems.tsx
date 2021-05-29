import { SortablePortfolioItem } from '../appData/portfolioSlice';
import {useAppSelector} from '../hooks/redux-hooks';

interface PortCatListProps {
    category: string;
    catId: string;
}

const PortCatItems:React.FC<PortCatListProps> = (props) => {
    const {catId, category} = props;

    const portfolio = useAppSelector(state => state.portfolio.items);
    let filteredList:any = [];
    portfolio.filter((item, index) => {

        for(let key in Object.keys(item.cso)) {
            let csoItem = item.cso[key];
            if(csoItem.catId === catId) {
                filteredList.push({...item,sortOrder:csoItem.sortOrder})
                return true;
            }
        }
        return false;
    })

    filteredList.sort((a:SortablePortfolioItem, b:SortablePortfolioItem) => {
        const valA = +a.sortOrder;
        const valB = +b.sortOrder;
        if(valA > valB) return 1;
        if(valA < valB) return -1;
        return 0;
    })

    return (
        <>
            <h1>{category}</h1>
            <ul>
                {filteredList && filteredList.map((item:SortablePortfolioItem) => {
                    return <li key={Math.random().toString()}>{item.projectTitle} - {item.sortOrder}</li>
                })}
            </ul>
        </>
    );
}

export default PortCatItems;