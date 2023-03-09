import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "pages/Home";
import Navbar from "components/Navbar";
import Register from "pages/Register";
import Users from "pages/Register/Users";

const Routes = () =>

    <BrowserRouter> 
        <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/user">
                <Users />
            </Route>
            <Route path="/moviment">
                <Register />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/reports">
                <Register />
            </Route>
            <Route path="/manager">
                <Register />
            </Route>
        </Switch>
    </ BrowserRouter>
   
export default Routes;
