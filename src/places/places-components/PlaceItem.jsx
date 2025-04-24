import React,{ useState,useContext } from 'react';

import Card from '../../shared/shared-components/UIElements/Card';
import Button from '../../shared/shared-components/FormElements/Button';
import Modal from '../../shared/shared-components/UIElements/Modal';
import { AuthContext } from '../../shared/shared-components/Context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/shared-components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/shared-components/UIElements/LoadingSpinner';
import './PlaceItem.css';

const PlaceItem = (props) => {

    const auth = useContext(AuthContext)

    const [showConfirmModal,setShowConfirmModal ] = useState(false);

    const showDeleteWarningModal = () => setShowConfirmModal(true);

    const cancelDeleteHandeler = () => setShowConfirmModal(false);

    const { isLoading, error, sendRequest, clearError} = useHttpClient();
     

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try{
            await sendRequest(`https://snapmap-backend.onrender.com/api/places/${props.id}`,'DELETE',null,{Authorization: "Bearer "+ auth.token});
            props.onDelete(props.id);
        } catch (err) {}
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            
            <Modal 
                show= {showConfirmModal}
                onCancel={cancelDeleteHandeler}
                header="Are you sure?"
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandeler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </React.Fragment>
                }
            >
                <p>Do you want to proceed and delete this place? Plese note that it can't be undone thereafter.</p>
            </Modal>
            <li className='place-item'>
                <Card className="place-item__content">
                    {isLoading && <LoadingSpinner asOverlay/>}
                    <div className='place-item__image'>
                        <img src={`https://snapmap-backend.onrender.com/${props.image}`} alt={props.title}/>
                    </div>
                    <div className='place-item__info'>
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className='place-item__actions'>
                        {auth.userId === props.creatorId && <Button to={`/places/${props.id}`}>EDIT</Button>}
                        {auth.userId === props.creatorId && <Button danger onClick={showDeleteWarningModal}>DELETE</Button>}
                        {auth.userId !== props.creatorId && <Button  to="/lokiai" 
                        state={{
                            title: props.title,
                            description: props.description,
                            address: props.address,
                            image: props.image,
                          }}
                          >Know More</Button>}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
};

export default PlaceItem;