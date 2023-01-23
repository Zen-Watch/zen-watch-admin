import React from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from './theme';
import Topbar from './scenes/global/Topbar';
import Sidebar from "./scenes/global/Sidebar";
import GasCost from "./scenes/gas_cost";
import { Route, Routes } from 'react-router-dom';
import Login from './scenes/login';

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app"> 
          <Sidebar />
          <main className="content"> 
            <Topbar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/gas_cost" element={<GasCost />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
