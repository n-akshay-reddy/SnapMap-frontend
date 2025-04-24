import { Link } from 'react-router-dom';


import Avatar from '../../shared/shared-components/UIElements/Avatar'
import Card from '../../shared/shared-components/UIElements/Card';
import './UserItem.css';

const UserItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
           {/* { console.log(props.image)} */}
            <Avatar image={`https://snapmap-backend.onrender.com/${props.image}`} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <div className="user-item__divider"></div>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
