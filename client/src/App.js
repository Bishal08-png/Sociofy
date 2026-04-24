import { useSelector } from 'react-redux';
import './App.css';
import Auth from './Pages/auth/Auth';
import Home from './Pages/home/Home';
import Profile from './Pages/profile/Profile';
import Chat from './Pages/Chat/Chat';
import Notifications from './Pages/Notifications/Notifications';
import NotFound from './Pages/NotFound/NotFound';
import { Routes, Route, Navigate } from 'react-router-dom';
import MobileNav from './Components/MobileNav/MobileNav';

function App() {

  const user = useSelector((state) => state.authReducer.authData);

  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>


      <Routes>
        <Route path='/' element={user ? <Navigate to='home' /> : <Navigate to='auth' />} />
        <Route path='/home' element={user ? <Home /> : <Navigate to='../auth' />} />
        <Route path='/auth' element={user ? <Navigate to='../home' /> : <Auth />} />
        <Route path='/profile/:id' element={user ? <Profile /> : <Navigate to='../auth' />} />
        <Route path='/chat' element={user ? <Chat /> : <Navigate to='../auth' />} />
        <Route path='/notifications' element={user ? <Notifications /> : <Navigate to='../auth' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <MobileNav />

    </div>
  );
}

export default App;
