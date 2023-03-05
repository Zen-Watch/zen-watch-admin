import { Box } from "@mui/material";
import Header from "../../../../components/Header";
import { useLocation } from 'react-router-dom';
import IFTTTTriggerRunHistoryProfile from "./IFTTTTriggerRunHistoryProfile";

export default function ViewIFTTTInstanceDetails() {
  const location = useLocation();
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="IFTTT Instance Details" subtitle="Get a detailed view of the IFTTT instance, toggle it on/off as required" />
      </Box>
      <IFTTTTriggerRunHistoryProfile data={location.state}/>
    </Box>
  );
}
