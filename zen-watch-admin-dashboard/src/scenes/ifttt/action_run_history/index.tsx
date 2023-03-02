import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function IFTTTActionRunHistory() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="IFTTT Action Run History" subtitle="History of all your IFTTT action activations" />
      </Box>
    </Box>
  );
}
