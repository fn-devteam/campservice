import { Link, NavLink } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-primary main-nav">
      <div className="container-fluid">
        <Link to="/" className="nav-logo-text">
          <h4>CampiService</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#dscatalog-navbar"
          aria-controls="dscatalog-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <NavLink to="/" activeClassName="active" exact>
                {' '}
                Home{' '}
              </NavLink>
            </li>
            <li>
              <NavLink to="/record" activeClassName="active">
                Cadastro{' '}
              </NavLink>
            </li>
            <li>
              <NavLink to="link" activeClassName="active">
                {' '}
                Movimento{' '}
              </NavLink>
            </li>
            <li>
              <NavLink to="link" activeClassName="active">
                {' '}
                Relatórios{' '}
              </NavLink>
            </li>
            <li>
              <NavLink to="link" activeClassName="active">
                {' '}
                Admin{' '}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
