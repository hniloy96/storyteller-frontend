import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import LOGIN from './Pages/Log-inAuth'
import SIGNUP from './Pages/Sign-upAuth'

import { UserContext } from './data';
import { useState } from 'react'

function App() {
  const { Provider: UserInfo } = UserContext

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <div className="App">
      <UserInfo value={{
        isAuthenticated,
        currentUser,
        setAuth: setIsAuthenticated,
        setUser: setCurrentUser
      }}>
        <Nav />
        <Routes>
          <Route path="/" element={<LOGIN />} />
          <Route path='/signup' element={ < SIGNUP />} />
        </Routes>
      </UserInfo>
    </div>
  );
}

export default App;
