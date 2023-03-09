import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import './styles.css';
import Users from './Users';

const Register = () => {
    return (
        <div className='register-container'>
            <Navbar />
            <div className='register-content>'>
                <Switch>
                    <Route path="/register/users">
                      <Users />
                   </Route>              
                   <Route path="/register/customers" >
                      <h1>Customer CRUD</h1>
                      </Route>              
                    <Route path="/register/suppliers" >
                      <h1>Supplier CRUD</h1>
                    </Route>              
                    <Route path="/register/products" >
                      <h1>Product CRUD</h1>
                    </Route>              
                    <Route path="/register/groupProducts" >
                      <h1>Group Products CRUD</h1>
                    </Route>              
                    <Route path="/register/vehicles" >
                      <h1>Vehicle CRUD</h1>
                    </Route>              
                </Switch>
            </div>
        </div>
  
)
  }
  
  export default Register;