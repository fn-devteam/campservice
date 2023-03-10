import './styles.css';
import { User } from 'types/user';
import { Link } from 'react-router-dom';

type Props = {
  user: User;
  onDelete: Function;
};

const UserCrudCard = ({ user, onDelete }: Props) => {

   
 
   (
    <div className="base-card product-crud-card">
      <div className="user-crud-card-top-container">
      </div>
      <div className="user-crud-card-description">
        <div className="user-crud-card-bottom-container">
          <h6>{user.firstName}</h6>
          <h6>{user.lastName} </h6>
          <h6>{user.email} </h6>
        </div>
      </div>
      <div className="user-crud-card-buttons-container">
        <button
         // onClick={() => handleDelete(user.id)}
          className="btn btn-outline-danger user-crud-card-button user-crud-card-button-first"
        >
          EXCLUIR
        </button>
        <Link to={`/register/users/${user.id}`}>
          <button className="btn btn-outline-secondary user-crud-card-button">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );

}
export default UserCrudCard;