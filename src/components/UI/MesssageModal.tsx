import {Modal, Button} from 'react-bootstrap';
import {useState} from 'react';


export interface MessageModalProps {
    modalTitle: string;
    modalMessage: string;
    okButtonHandler?: (args?: any) => void;
    cancelButtonHandler?: (args?: any) => void;
    confirmButtonHandler?: (args?: any) => void;    
    okButtonText?: string;    
    cancelButtonText? : string;
    confirmButtonText? : string;
    showOk: boolean;
    showCancel: boolean;
    showConfirm: boolean;
}



const MessageModal:React.FC<MessageModalProps> = (props) => {

    const {modalTitle, 
        modalMessage, 
        okButtonHandler, 
        cancelButtonHandler, 
        confirmButtonHandler, 
        okButtonText="OK", 
        cancelButtonText="Cancel", 
        confirmButtonText="Confirm",
        showOk = true,
        showCancel = false,
        showConfirm = false} = props;

    const [show, setShow] = useState(false);

    const handleOkButtonClick = () => {
        if(okButtonHandler) {
            okButtonHandler();
        }
        handleClose();
    }

    const handleCanelButtonClick = () => {
        if(cancelButtonHandler) {
            cancelButtonHandler();
        
        }
        handleClose();
    }


    const handleCloseButtonClick = () => {

        handleClose();
    }


    const handleConfirmButtonClick = () => {
        if(confirmButtonHandler) {
            confirmButtonHandler()
        }

    }


    const handleClose = () => {
        setShow(false)
    }


    return (
        <Modal 
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
        
        <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {modalMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>            

        </Modal>
    )

}




export const showModal = () => {

}


export const hideModal = () => {

}


export default MessageModal