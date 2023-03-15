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
          <a href="link" className='active'> Usuários </a>
        </li>
        <li>
          <a href="link">Clientes </a>
        </li>
        <li>
          <a href="link"> Fornecedores </a>
        </li>
        <li>
          <a href="link"> Produtos </a>
        </li>
        <li>
          <a href="link"> Grupo de Produtos </a>
        </li>
        <li>
          <a href="link"> Veículos </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
)
  }
  
  export default Navbar;
  