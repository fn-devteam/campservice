import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "pages/Home";
import Navbar from "components/Navbar";
import Users from "pages/Record/Users";
import Record from "pages/Record";

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
                <Record />
            </Route>
            <Route path="/record">
                <Record />
            </Route>
            <Route path="/reports">
                <Record />
            </Route>
            <Route path="/manager">
                <Record />
            </Route>
        </Switch>
    </ BrowserRouter>
   
export default Routes;
