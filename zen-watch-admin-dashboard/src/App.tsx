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
import IFTTTInstances from "./scenes/ifttt/instances";
import ViewIFTTTInstanceDetails from "./scenes/ifttt/detailed_profile_views/view_instance_details";
import IFTTTTriggerRunHistory from "./scenes/ifttt/trigger_run_history";
import IFTTTActionRunHistory from "./scenes/ifttt/action_run_history";
import IFTTTCreateNewTrigger from "./scenes/ifttt/create_new_trigger";
import IFTTTCreateNewAction from "./scenes/ifttt/create_new_action";
import IFTTTCodeSubmissions from "./scenes/ifttt/code_submissions";
import CreateIFTTTInstanceInfoFormWrapper from "./scenes/ifttt/create_instance/wrappers/CreateIFTTTInstanceInfoFormWrapper";
import CreateIFTTTInstanceSelectTriggerWrapper from "./scenes/ifttt/create_instance/wrappers/CreateIFTTTInstanceSelectTriggerWrapper";
import CreateIFTTTInstanceSelectActionWrapper from "./scenes/ifttt/create_instance/wrappers/CreateIFTTTInstanceSelectActionWrapper";
import MessagePage from "./components/MessagePage";
import CommunityShowcase from "./scenes/community/showcase";
import ViewIFTTTSubmittedTriggerDetails from "./scenes/ifttt/detailed_profile_views/view_trigger_submitted_code_details";
import ViewIFTTTSubmittedActionDetails from "./scenes/ifttt/detailed_profile_views/view_action_submitted_code_details";
import ViewIFTTTTriggerRunHistoryDetails from "./scenes/ifttt/detailed_profile_views/view_trigger_run_history_details";
import ViewIFTTTActionRunHistoryDetails from "./scenes/ifttt/detailed_profile_views/view_action_run_history_details";
import ProtocolManuals from "./scenes/community/protocol_manuals";
import IFTTTRecipeTutorials from "./scenes/community/recipe_tutorials";
import CreateCloudFunction from "./scenes/function/create_cloud_function";
import DeployCloudFunction from "./scenes/function/deploy_cloud_function";
import YourCloudFunctions from "./scenes/function/your_cloud_function";
import AppEventsSQLEditor from "./scenes/events/sql_editor";
import AIDeveloperConsole from "./scenes/console/ai_developer_console";

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
                <Route path="/ifttt_instances" element={<IFTTTInstances />} />
                <Route path="/create_ifttt" element={<CreateIFTTTInstanceInfoFormWrapper />} />
                <Route path="/create_ifttt_select_trigger" element={<CreateIFTTTInstanceSelectTriggerWrapper />} />
                <Route path="/create_ifttt_select_action" element={<CreateIFTTTInstanceSelectActionWrapper />} />
                <Route path="/status_page" element={<MessagePage />} />
                <Route path="/view_ifttt_instance" element={<ViewIFTTTInstanceDetails />} />
                <Route path="/trigger_run_history" element={<IFTTTTriggerRunHistory />} />
                <Route path="/action_run_history" element={<IFTTTActionRunHistory />} />
                <Route path="/create_new_trigger" element={<IFTTTCreateNewTrigger />} />
                <Route path="/create_new_action" element={<IFTTTCreateNewAction />} />
                <Route path="/code_submissions" element={<IFTTTCodeSubmissions />} />  
                <Route path="/view_submitted_trigger_details" element={<ViewIFTTTSubmittedTriggerDetails />} />   
                <Route path="/view_submitted_action_details" element={<ViewIFTTTSubmittedActionDetails />} /> 
                <Route path="/view_trigger_run_history_details" element={<ViewIFTTTTriggerRunHistoryDetails />} />  
                <Route path="/view_action_run_history_details" element={<ViewIFTTTActionRunHistoryDetails />} /> 

                <Route path="/showcase" element={<CommunityShowcase />} />
                <Route path="/protocol_manuals" element={<ProtocolManuals />} />
                <Route path="/recipe_tutorials" element={<IFTTTRecipeTutorials />} />

                <Route path="/create_cloud_function" element={<CreateCloudFunction />} />
                <Route path="/deploy_cloud_function" element={<DeployCloudFunction />} />
                <Route path="/your_cloud_functions" element={<YourCloudFunctions />} />

                <Route path="/app_events_sql_editor" element={<AppEventsSQLEditor />} />
                <Route path="/ai_developer_console" element={<AIDeveloperConsole />} />

                {/* <Route path="/transaction_errors" element={<TransactionErrors />} /> */}
                <Route path="/gas_cost" element={<GasCost />} />
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
