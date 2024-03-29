import { Box } from "@mui/material";
import Header from "../../../../components/Header";
import CreateIFTTTInstanceInfoForm from "../CreateIFTTTInstanceInfoForm";

export default function CreateIFTTTInstanceInfoFormWrapper() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Create an IFTTT Recipe" subtitle="Create an IFTTT recipe using existing triggers and actions" />
      </Box>
      <CreateIFTTTInstanceInfoForm />
    </Box>
  );
}