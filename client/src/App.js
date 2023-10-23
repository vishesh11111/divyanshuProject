import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Navbar } from './components/Navbar';
import { AllRoute } from './components/routes/AllRoute';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { GetCart } from './pages/details/Details';
import { useDispatch } from 'react-redux';
import { CartLength } from './Redux/action';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    passDataToCart();
  }, []);

  const passDataToCart = async () => {
    let result = await GetCart();
    dispatch(CartLength(result.length))
  }

  return (
    <div className="App">
      <Navbar />
      <AllRoute />
    </div>
  );
}

export default App;
