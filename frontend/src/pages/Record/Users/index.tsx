
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';
 
const Users = () => {
  return (
    <Switch>
        <Route path="/record/users" exact>
            <List />
        </Route>
        <Route path="/record/users/:userId">
            <Form />
        </Route>
    </Switch>
)
};
 
export default Users;