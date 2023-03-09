import { Link } from 'react-router-dom';
import './styles.css';

const List = () => {
    const user =  {
        "id": 1,
        "firstName": "Evandro",
        "lastName": "Campigoto",
        "email": "campigoto@hotmail.com"
    }

    return (
    <>
    <div className='input-container'>
      <Link to="/register/users/create">
        <button className="btn btn-primary text-white btn-crud-add">Adicionar</button>
      </Link>
      <div className='base-card user-search-container'>
            Pesquisar
      </div> 
       
    </div>       
    <div className="user-list-header">
        <div>Nome </div>
        <div>E-mail</div>
    </div>   
    <div className="user-list-detail column">
        <div className='user-name-container'>
        <h6>{user.firstName} {user.lastName}</h6>
        </div>
        <div className='user-email-container'>
        <h6>{user.email}</h6>
        </div>
    </div>
    </>
    )
    
}

export default List;