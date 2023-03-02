import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function IFTTTTriggerRunHistory() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="IFTTT Trigger Run History" subtitle="History of all your IFTTT trigger activations" />
      </Box>
    </Box>
  );
}
