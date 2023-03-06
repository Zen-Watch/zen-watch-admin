import { Box } from "@mui/material";
import Header from "../../../../components/Header";
import { useLocation } from 'react-router-dom';
import IFTTTActionSubmittedCodeProfile from "./IFTTTActionSubmittedCodeProfile";

export default function ViewIFTTTSubmittedActionDetails() {
  const location = useLocation();
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="Your IFTTT Action Details" subtitle="Get a detailed view of your IFTTT action" />
      </Box>
      <IFTTTActionSubmittedCodeProfile data={location.state}/>
    </Box>
  );
}
