import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function DeployCloudFunction() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Deploy a Cloud Function"
          subtitle="Deploy available cloud functions to the AWS lambda"
        />
      </Box>
    </Box>
  );
}
