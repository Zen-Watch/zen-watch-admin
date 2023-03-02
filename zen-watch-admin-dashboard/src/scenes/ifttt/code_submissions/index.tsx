import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function IFTTTCodeSubmissions() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Your Code Submissions" subtitle="View the review status of your trigger & action code submissions" />
      </Box>
    </Box>
  );
}
