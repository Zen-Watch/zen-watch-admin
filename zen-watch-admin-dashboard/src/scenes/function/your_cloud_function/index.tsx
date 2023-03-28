import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function YourCloudFunctions() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Your Cloud Functions"
          subtitle="List of all your deployed cloud functions"
        />
      </Box>
    </Box>
  );
}
