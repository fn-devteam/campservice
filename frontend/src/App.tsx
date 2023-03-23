import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/custom.scss';
import './App.css';
import Routes from 'Routes';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
    <Routes />
    <ToastContainer />
    </>
  );
}

export default App;
