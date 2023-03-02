import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function IFTTTCreateNewTrigger() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Create an IFTTT Trigger" subtitle="Develop a new IFTTT trigger and submit for review" />
      </Box>
    </Box>
  );
}
