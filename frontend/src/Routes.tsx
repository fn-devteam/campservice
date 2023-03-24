import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "pages/Home";
import Navbar from "components/Navbar";
import Record from "pages/Record";
import Login from "pages/Login";

const Routes = () =>

    <BrowserRouter> 
        <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/record">
                <Record />
            </Route>
            <Route path="/moviment">
                <Record />
            </Route>
            <Route path="/reports">
                <Record />
            </Route>
            <Route path="/manager">
                <Record />
            </Route>
            <Route path="/pages/login" >
                <Login />
            </Route>
        </Switch>
    </ BrowserRouter>
   
export default Routes;
