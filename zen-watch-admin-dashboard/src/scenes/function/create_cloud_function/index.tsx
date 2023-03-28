import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function CreateCloudFunction() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Create a Cloud Function"
          subtitle="Create and Publish Serverless Functions to the community"
        />
      </Box>
    </Box>
  );
}
