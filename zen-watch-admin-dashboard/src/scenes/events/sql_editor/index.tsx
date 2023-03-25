import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function AppEventsSQLEditor() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="App Events SQL Editor"
          subtitle="Visualize your app events in SQL"
        />
      </Box>
    </Box>
  );
}
