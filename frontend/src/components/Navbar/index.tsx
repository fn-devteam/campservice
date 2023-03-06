import { NavLink } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
    return (
    <nav className='navbar navbar-expand-md bg-primary main-nav'>
  <div className='container-fluid'>
    <a href="link" className="nav-logo-text">
      <h4>CampService</h4>
    </a>
    <div className='collapse navbar-collapse'>
      <ul className='navbar-nav offset-md-2 main-menu'>
        <li>
          <NavLink to="/" > Home </NavLink>
        </li>
        <li>
          <NavLink to="/register">Cadastro </NavLink>
        </li>
        <li>
          <NavLink to="link"> Movimento </NavLink>
        </li>
        <li>
          <NavLink to="link"> Relatórios </NavLink>
        </li>
        <li>
          <NavLink to="link"> Admin </NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
)
  }
  
  export default Navbar;
  