import {useState } from 'react';
import {Col, Row} from 'react-bootstrap'
import {ContactItemFormProps} from '../../interfaces';

const ContactItemForm:React.FC<ContactItemFormProps> = (props) => {

    const {_id, name, displayValue, linkUrl, faPrefix, fontAwesomeIcon, handleDelete, handleUpdate, handleCreate, handleMove, showUpArrow=false, showDownArrow=false} = props;

    const [contactItem, updateContactItem] = useState({
        _id,
        name,
        displayValue,
        linkUrl,
        faPrefix,
        fontAwesomeIcon
    })
    //const {name, displayValue, linkUrl, faPrefix, fontAwesomeIcon} = props;


    const handleBtnCreateClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(handleCreate) {
            handleCreate(contactItem)
        }

        updateContactItem((prevState) => {
            return {
                _id: undefined,
                name: '',
                displayValue: '',
                linkUrl: '',
                faPrefix: '',
                fontAwesomeIcon: ''
            }
        })

    }

    const handleBtnUpdateClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(handleUpdate) {
            handleUpdate(contactItem)
        }

   
    }

    const handleMoveUpClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const target = e.target as HTMLAnchorElement;
        const elemId = target.getAttribute('id') || '';
        const _id = elemId.replace('arrowUp_','');
        if(handleMove) {handleMove(_id, -1)};
        
    }

    const handleMoveDownClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const target = e.target as HTMLAnchorElement;
        const elemId = target.getAttribute('id') || '';
        const _id = elemId.replace('arrowDown_','');
        if(handleMove) {handleMove(_id, 1)};
    }


    const handleTextUpdate = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        const id = e.target.id;
        const elem = id.split('_');



        updateContactItem((prevState) => {
            return (
                {
                    ...prevState,
                    [elem[0]] : val
                }
            )
        })
    }


    const newContact = contactItem._id === undefined || contactItem._id === null
    const contactItemId = newContact ? Math.random().toString() : contactItem._id;


    return (
        
        <Row className="contact-item__form form-group">
                <Col xs="2" className="m-0 p-0"><input className="contact-item__form--input form-control" placeholder="name" type="text" id={`name_${contactItemId}`} value={contactItem.name} onChange={handleTextUpdate} /></Col>
                <Col xs="4" className="m-0 px-1"><input className="contact-item__form--input form-control" placeholder="display value" type="text" id={`displayValue_${contactItemId}`} value={contactItem.displayValue} onChange={handleTextUpdate} /></Col>
                <Col xs="2" className="m-0 px-1">
                    <select id={`faPrefix_${contactItemId}`} className="contact-item__form--input form-control" value={contactItem.faPrefix} onChange={handleTextUpdate}>
                    <option value="fas">Solid</option>
                    <option value="fab">Branding</option>
                    </select>
                </Col>                
                <Col xs="2" className="m-0 px-1 text-nowrap">
                    {newContact && <button type="button" className="contact-item__form--btn btn btn-primary btn-sm" id="btnCreate" onClick={handleBtnCreateClick}>Create</button>}
                    {!newContact && <button type="button" className="contact-item__form--btn btn btn-danger btn-sm mr-1" id={`btnDelete_${contactItemId}`} onClick={handleDelete}>Delete</button>}            
                    {!newContact && <button type="button" className="contact-item__form--btn btn btn-primary btn-sm" id={`btnUpdate_${contactItemId}`} onClick={handleBtnUpdateClick}>Update</button>}            
                </Col>  
                <Col xs="1" className="p-0 m-0">{showUpArrow && <div  className="float-right text-primary contact-item__form--arrow contact-item__form--arrow-up"><a href="#moveup" onClick={handleMoveUpClick} id={`arrowUp_${contactItemId}`} rel="noreferrer" className="contact-item__form--arrowlink">5</a></div>}</Col>
                <Col xs="1" className="p-0 m-0">{showDownArrow && <div className="float-left text-primary contact-item__form--arrow contact-item__form--arrow-down"><a href="#movedown" onClick={handleMoveDownClick} id={`arrowDown_${contactItemId}`} rel="noreferrer" className="contact-item__form--arrowlink">6</a></div>}</Col>
                <Col xs="6" className="m-0 pl-0 pr-1 py-1"><input className="contact-item__form--input form-control" placeholder="link url" type="text" id={`linkUrl_${contactItemId}`} value={contactItem.linkUrl} onChange={handleTextUpdate} /></Col>
                <Col xs="2" className="m-0 px-1 py-1"><input className="contact-item__form--input form-control" placeholder="FA Icon" type="text" id={`fontAwesomeIcon_${contactItemId}`} value={contactItem.fontAwesomeIcon} onChange={handleTextUpdate} /></Col>
        </Row>

    )
}

export default ContactItemForm;