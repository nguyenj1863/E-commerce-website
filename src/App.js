import { Routes, Route } from 'react-router-dom'
import Home from './routes/home/home.routes';
import Navigation from './routes/navigation/navigation.routes';
import Shop from './routes/shop/shop.routes';
import Authentication from './components/authentication/authentication';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='authentication' element={<Authentication />}/>
      </Route>
    </Routes>
  );
}

export default App;
