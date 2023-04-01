import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Products from './Products';
import ProductGroups from './ProductsGroups';
import './styles.css';
import Users from './Users';
import Suppliers from './Suppliers';

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
                      <Suppliers />
                    </Route>              
                    <Route path="/record/products" >
                      <Products />
                    </Route>              
                    <Route path="/record/productsGroups" >
                      <ProductGroups />
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