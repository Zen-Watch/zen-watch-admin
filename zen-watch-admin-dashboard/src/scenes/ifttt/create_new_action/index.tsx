import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function IFTTTCreateNewAction() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Create an IFTTT Action" subtitle="Develop a new IFTTT action and submit for review" />
      </Box>
    </Box>
  );
}
