import { NavLink } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
    return (
  
<nav className=' register-nav-container'>
<div>
  <div>
    <ul >
      <li>
        <NavLink  to="/register/users" className='register-nav-item'>  
        <p>Usuários</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/register/customers" className='register-nav-item'>
        <p>Clientes</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/register/suppliers" className='register-nav-item'>  
        <p>Fornecedores</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/register/products" className='register-nav-item'>  
        <p>Produtos</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/register/groupProducts" className='  register-nav-item'> 
        <p>Grupo Produtos</p> 
        </NavLink>
      </li>
      <li>
        <NavLink to="/register/vehicles" className='  register-nav-item'> 
        <p>Veículos</p> 
        </NavLink>
      </li>
    </ul>
  </div>
</div>
</nav>
)
  }
  
  export default Navbar;