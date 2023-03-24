
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';
 
const ProductsGroups = () => {
  return (
    <Switch>
        <Route path="/record/productsGroups" exact>
            <List />
        </Route>
        <Route path="/record/productsGroups/:productGroupId">
            <Form />
        </Route>
    </Switch>
)
};
 
export default ProductsGroups;