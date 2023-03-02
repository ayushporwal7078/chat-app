
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat'



function App() {
  return (
    <BrowserRouter >
  <Navigation/>     
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/chat' element={<Chat/>}/>
    </Routes> 
    </BrowserRouter>
  );
}

export default App;