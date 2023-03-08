import { Box } from "@mui/material";
import Header from "../../../../components/Header";
import { useLocation } from 'react-router-dom';
import IFTTTTriggerRunHistoryProfile from "./IFTTTTriggerRunHistoryProfile";

export default function ViewIFTTTTriggerRunHistoryDetails() {
  const location = useLocation();
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Your IFTTT Trigger Run History Details" subtitle="Get a detailed view of your IFTTT activation" />
      </Box>
      <IFTTTTriggerRunHistoryProfile data={location.state}/>
    </Box>
  );
}
