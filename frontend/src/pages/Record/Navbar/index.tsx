import { NavLink } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
    return (
  
<nav className=' register-nav-container'>
<div>
  <div>
    <ul >
      <li>
        <NavLink  to="/record/users" className='register-nav-item'>  
        <p>Usuários</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/record/customers" className='register-nav-item'>
        <p>Clientes</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/record/suppliers" className='register-nav-item'>  
        <p>Fornecedores</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/record/products" className='register-nav-item'>  
        <p>Produtos</p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/record/productsGroups" className='  register-nav-item'> 
        <p>Grupo Produtos</p> 
        </NavLink>
      </li>
      <li>
        <NavLink to="/record/vehicles" className='  register-nav-item'> 
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