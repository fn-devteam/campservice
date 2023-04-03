import { Route, Switch } from "react-router-dom";
import Form from "./Form";
import List from "./List";


const Products = () => {

    return (
        <Switch>
            <Route path="/record/products" exact>
                <List />
            </Route>
            <Route path="/record/products/:productId">
                <Form />
            </Route>
        </Switch>
    )
}

export default Products;
