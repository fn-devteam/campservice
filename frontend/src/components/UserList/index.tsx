import { User } from 'types/user';
import './styles.css';

type props = {
    user: User;
}

const UserList = ( { user } : props) => {

    return (
        <div className="base-card user-card">
            <div className="card-top-container">
            </div>
            <div className="card-bottom-container">
                <h6>{user.firstName}</h6>
            </div>
        </div>
    );
}

export default UserList;