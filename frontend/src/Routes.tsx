import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "pages/Home";
import Navbar from "components/Navbar";
import User from "pages/User";
import Register from "pages/Register";

const Routes = () =>

    <BrowserRouter> 
        <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/user">
                <User />
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
