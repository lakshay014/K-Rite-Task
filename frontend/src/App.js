import "./App.css";

import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";

// Components
import Header from "./Components/Header";
import Loader from "./Components/Loader";

// Pages
import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";

// MUI
import { theme } from "./MUI/theme";

//Contexts
import { UserProvider } from "./Contexts/userContext";
import { LoadingProvider } from "./Contexts/loadingContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <LoadingProvider>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<HomePage />} />
          </Routes>
          <Toaster />
          <Loader />
        </LoadingProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
