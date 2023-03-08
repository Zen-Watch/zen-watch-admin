import { Box } from "@mui/material";
import Header from "../../../../components/Header";
import { useLocation } from 'react-router-dom';
import IFTTTActionRunHistoryProfile from "./IFTTTActionRunHistoryProfile";

export default function ViewIFTTTActionRunHistoryDetails() {
  const location = useLocation();
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Your IFTTT Action Run History Details" subtitle="Get a detailed view of your IFTTT action activation" />
      </Box>
      <IFTTTActionRunHistoryProfile data={location.state}/>
    </Box>
  );
}
