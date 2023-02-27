import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import GasCost from "./scenes/v1/gas_cost";
import { Route, Routes } from "react-router-dom";
import Login from "./scenes/login";
import { useAppSelector } from "./app/hooks";
import PrivateRoutes from "./components/PrivateRoutes";
import UnprivatePrivateRoute from "./components/UnprivateRoute";
import NoMatch from "./scenes/global/NoMatch";
import GasCostTableView from "./scenes/v1/gas_cost/GasCostTableView";

function App() {
  const [theme, colorMode] = useMode();
  const status = useAppSelector((state) => state.app.status);
  const connected = (status === 'connected');

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {connected && <Sidebar />}
          <main className="content">
            {connected && <Topbar />}
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<GasCost />} />
                <Route path="/gas_cost" element={<GasCost />} />
                {/* <Route path="/transaction_errors" element={<TransactionErrors />} /> */}
                <Route path="/gas_cost_tableview" element={<GasCostTableView />} />
              </Route>
              <Route element={<UnprivatePrivateRoute />}>
                <Route path="/" element={<Login />} />
              </Route>
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
