import ButtonIcon from 'components/Navbar/ButtonIcon';
import './styles.css';


const Login = () => {
  return (
   

    <div className="base-card login-card">
      <h1>Usuários</h1>
      <form>
        <div className="mb-4">
          <input
            type="text"
            className="form-control base-input"
            placeholder="Email"
            name="username"
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            className="form-control base-input "
            placeholder="Password"
            name="password"
          />
        </div>
        <div className="login-submit">
          <ButtonIcon text="Fazer login" />
        </div>
        <div className="signup-container">
          <span className="not-registered">Não tem Cadastro?</span>
          
        </div>
      </form>
    </div>

    
  );
}

export default Login;


//<div className='home-container'>
//<h1>Cadastro de usuários</h1>
//<div>
//    <ButtonIcon text="INICIAR"/>
//</div>
//</div>