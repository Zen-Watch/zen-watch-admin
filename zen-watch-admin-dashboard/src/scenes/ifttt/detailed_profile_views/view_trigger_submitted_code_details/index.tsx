import { Box } from "@mui/material";
import Header from "../../../../components/Header";
import { useLocation } from 'react-router-dom';
import IFTTTTriggerSubmittedCodeProfile from "./IFTTTTriggerSubmittedCodeProfile";

export default function ViewIFTTTSubmittedTriggerDetails() {
  const location = useLocation();
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Your IFTTT Trigger Details" subtitle="Get a detailed view of your IFTTT trigger" />
      </Box>
      <IFTTTTriggerSubmittedCodeProfile data={location.state}/>
    </Box>
  );
}
