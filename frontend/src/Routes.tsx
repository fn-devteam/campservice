import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "pages/Home";
import Navbar from "components/Navbar";
import Register from "pages/Record";
import Users from "pages/Record/Users";

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
            <Route path="/record">
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
