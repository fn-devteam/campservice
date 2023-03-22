import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import './styles.css';
import Users from './Users';

const Record = () => {
    return (
        <div className='register-container'>
            <Navbar />
            <div className='register-content'>
                <Switch>  
                    <Route path="/record/users">
                      <Users />
                   </Route>              
                   <Route path="/record/customers" >
                      <h1>Customer CRUD</h1>
                      </Route>              
                    <Route path="/record/suppliers" >
                      <h1>Supplier CRUD</h1>
                    </Route>              
                    <Route path="/record/products" >
                      <h1>Product CRUD</h1>
                    </Route>              
                    <Route path="/record/groupProducts" >
                      <h1>Group Products CRUD</h1>
                    </Route>              
                    <Route path="/record/vehicles" >
                      <h1>Vehicle CRUD</h1>
                    </Route>              
                </Switch>
            </div>
        </div>
  
)
  }
  
  export default Record;