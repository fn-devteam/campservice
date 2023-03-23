import { ReactComponent as MainImage } from 'assets/Images/main-image.svg';
import ButtonIcon from 'components/Navbar/ButtonIcon';
import { Link } from 'react-router-dom';
import './styles.css';
const Home = () => {
  
    return (
      <div className="home-container">
        <div className="base-card home-card">
          <div className="home-content-container">
            <div>
              <h1>Conheça o melhor sistema de auto peças</h1>
              <p>
                Ajudaremos você a encontrar os melhores produtos e serviços disponíveis no
                mercado.
              </p>
            </div>
            <div>
              <Link to="/pages/login">
                <ButtonIcon text="Fazer Login " />
              </Link>
            </div>
          </div>
          <div className="home-image-container">
            <MainImage />
          </div>
        </div>
      </div>
    );
  }
export default Home;
