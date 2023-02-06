
import { Routes, Route, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material'
import { themeSettings } from './theme';
import { createTheme } from "@mui/material/styles";
import HomePage from './scenes/homePage';
import LoginPage from './scenes/LoginPage';

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

        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
