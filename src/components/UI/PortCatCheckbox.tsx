import {PortCatCheckboxProps} from '../../interfaces'



const PortCatCheckbox:React.FC<PortCatCheckboxProps> = (props) => {
    const {checked, id, onChange, category} = props;

    // const [checked, setChecked] = useState(false)


    return (
        <label>
            <input className="portCatCheckbox" type="checkbox" checked={checked} onChange={onChange} name="portcat" id={id} value={id} />{category}
        </label>
    );    
}

export default PortCatCheckbox;