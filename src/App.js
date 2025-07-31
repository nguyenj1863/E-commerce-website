import { Routes, Route } from 'react-router-dom'
import Home from './routes/home/home.routes';
import Navigation from './routes/navigation/navigation.routes';
import Shop from './routes/shop/shop.routes';
import SignIn from './components/sign-in/sign-in.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />}/>
      </Route>
    </Routes>
  );
}

export default App;
