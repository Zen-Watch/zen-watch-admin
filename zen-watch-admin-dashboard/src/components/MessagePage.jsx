import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";

const StatusTypography = styled(Typography)(({ status }) => ({
  color: status === "success" ? green[500] : red[500],
}));

const MessagePage = () => {
  const { state } = useLocation();
  const { message, submessage, status } = state || {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "100vh",
        paddingTop: "10vh",
      }}
    >
      <StatusTypography variant="h2" status={status}>
        {status === "success" ? "Success" : "Error"}
      </StatusTypography>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="h4">{message}</Typography>
        <Typography variant="h6">{submessage}</Typography>
      </Box>
    </Box>
  );
};

export default MessagePage;
