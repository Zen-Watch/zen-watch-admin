import { Box } from "@mui/material";
import Header from "../../../../components/Header";
import SelectIFTTTAction from "../SelectIFTTTAction";

export default function CreateIFTTTInstanceSelectActionWrapper() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Create an IFTTT Instance" subtitle="Create an IFTTT instance using existing triggers and actions" />
      </Box>
      <SelectIFTTTAction />
    </Box>
  );
}