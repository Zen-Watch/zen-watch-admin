import { Box } from "@mui/material";
import Header from "../../../components/Header";
import SelectIFTTTTriggerPage from "./SelectIFTTTTriggerPage";

export default function CreateIFTTTInstance() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Create an IFTTT Instance" subtitle="Create an IFTTT instance using existing triggers and actions" />
      </Box>
      <SelectIFTTTTriggerPage />
    </Box>
  );
}