
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';
 
const Users = () => {
  return (
    <Switch>
        <Route path="/register/users" exact>
            <List />
        </Route>
        <Route path="/register/users/:userId">
            <Form />
        </Route>
    </Switch>
)
};
 
export default Users;