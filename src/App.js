
import { Routes, Route, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material'
import { themeSettings } from './theme';
import { createTheme } from "@mui/material/styles";
import HomePage from './Pages/homePage';
import LoginPage from './Pages/LoginPage';
import PostDetail from './Pages/Showpostpage'
import PostEdit from './Pages/EditPost'
import Userpage from "./Pages/Userpage"
import Profilepage from "./Pages/Profilepage"



function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <ThemeProvider theme={theme} >
        <CssBaseline />
        <Routes>
          <Route path='/' element={< LoginPage />} />
          <Route path='/home' element={isAuth ? < HomePage /> : <Navigate to="/" />} />
          <Route path='/post/:id' element={isAuth ? < PostDetail /> : <Navigate to="/" />} />
          <Route path='/post-update/:id' element={isAuth ? < PostEdit /> : <Navigate to="/" />} />
          <Route path='/Profile' element={isAuth ? < Profilepage /> : <Navigate to="/" />} />
          <Route path='/user/:id' element={isAuth ? < Userpage /> : <Navigate to="/" />} />

          

        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
