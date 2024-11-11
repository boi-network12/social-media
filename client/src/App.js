import './App.css';
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import MainNavbar from './components/MainNavbar/MainNavbar';
import Home from './pages/Home/Home';
import Watch from './pages/watch/Watch';
import Marketplace from './pages/MarketPlace/Marketplace';
import { Groups } from './pages/Groups/Groups';
import Gaming from './pages/Gaming/Gaming';
import Notification from './pages/Notification/Notification';
import Menu from './pages/Menu/Menu';
import Message from './pages/Message/Message';

function App() {
  return (
    <Router>
      <AppWithNavbar />
    </Router>
  );
}

function AppWithNavbar() {
  const location = useLocation(); // Get the current location

  // List of routes where you want to display the MainNavbar
  const pagesWithNavbar = [
    '/',
    '/watch',
    '/marketplace',
    '/groups',
    '/gaming',
    '/notification',
    '/menu',
    '/message',
    '/friend-request'
  ];

  return (
    <div>
      {/* Conditionally render the MainNavbar based on the current pathname */}
      {pagesWithNavbar.includes(location.pathname) && <MainNavbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/watch' element={<Watch />} />
        <Route path='/marketplace' element={<Marketplace />} />
        <Route path='/groups' element={<Groups />} />
        <Route path='/gaming' element={<Gaming />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/message' element={<Message />} />
        <Route path='/friend-request' element={<Message />} />
      </Routes>
    </div>
  );
}

export default App;
