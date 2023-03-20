import { useMemo } from "react";

import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";

import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const isAuth = !!useSelector((state) => state.token);

  console.log("ognjiste", process.env.REACT_APP_BASE_URL);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={!isAuth ? <Navigate to="/" /> : <HomePage />}
            />
            <Route
              path="/profile/:userId"
              element={!isAuth ? <Navigate to="/" /> : <ProfilePage />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
