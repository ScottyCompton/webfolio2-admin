import {useAppSelector} from '../hooks/redux-hooks';
import PortCatItems from './PortCatItems';


const PortCatList:React.FC = () => {
    const portCats = useAppSelector(state => state.portfolio.categories);

    return (
        <>
            {portCats && portCats.map((item) => {
                return <PortCatItems key={Math.random().toString()} category={item.category} catId={item._id} />
            })}
        </>
    );

}

export default PortCatList;






