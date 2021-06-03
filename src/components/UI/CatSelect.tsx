import {useState} from 'react';
import {useAppSelector} from '../../hooks/redux-hooks';
import {CatSelectProps, PortfolioCategory} from '../../interfaces';

//   handleAddTodo: (item:Todo) => void;

const CatSelect:React.FC<CatSelectProps> = (props) => {
    const cats:PortfolioCategory[] = useAppSelector(state => state.portfolio.categories);
    const [catId, setCatId] = useState(props.catId);
    const onChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        props.onChangeHandler(e.target.value);
        setCatId(e.target.value);
    }


    return (
        <fieldset>
                <div className="form-group">
                <select className="form-control float-right" id="catSelect" value={catId} onChange={onChange}>
                    {cats.map((cat) => {
                        return (
                            <option key={Math.random().toString()} value={cat._id}>{cat.category}</option>
                        )
                    })}
                </select>
                </div>
        </fieldset>
    )

}

export default CatSelect;