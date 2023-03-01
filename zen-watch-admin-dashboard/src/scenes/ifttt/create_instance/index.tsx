import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function CreateIFTTTInstance() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Create IFTTT Instance" subtitle="Create a new IFTTT instance" />
      </Box>
    </Box>
  );
}
