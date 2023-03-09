import { Box } from "@mui/material";
import Header from "../../../../components/Header";
import { useLocation } from 'react-router-dom';
import IFTTTInstanceProfile from "./IFTTTInstanceProfile";

export default function ViewIFTTTInstanceDetails() {
  const location = useLocation();
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="IFTTT Recipe Details" subtitle="Get a detailed view of the IFTTT Recipe, toggle it on/off as required" />
      </Box>
      <IFTTTInstanceProfile data={location.state}/>
    </Box>
  );
}
