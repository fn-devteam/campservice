import { Route, Switch } from "react-router-dom";
import Form from "./Form";
import List from "./List";


const Suppliers = () => {

    return (
        <Switch>
            <Route path="/record/suppliers" exact>
                <List />
            </Route>
            <Route path="/record/suppliers/:supplierId">
                <Form />
            </Route>
        </Switch>
    )
}

export default Suppliers;
