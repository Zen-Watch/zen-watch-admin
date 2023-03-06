import { Box, Typography, Paper } from "@mui/material";

/*
  To make this component full screen, do the following from L18-20
  <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4, width: "100%", }}>
        <Box sx={{ mr: 4, width: "100%", }}>
          <Paper sx={{ padding: 2, width: "100%", }}>
*/

export default function IFTTTActionSubmittedCodeProfile(props) {
  const data = props.data;

  return (
    <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Action Details
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Box sx={{ mr: 4 }}>
          <Paper sx={{ padding: 2 }}>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>Name:</strong>
              </Typography>
              <Typography variant="body1">{data.action_name}</Typography>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>Description:</strong>
              </Typography>
              <Typography variant="body1">
                {data.action_description}
              </Typography>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>Signature:</strong>
              </Typography>
              <Typography variant="body1">{data.action_signature}</Typography>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>Signature Description:</strong>
              </Typography>
              <Typography variant="body1">
                {data.action_signature_description}
              </Typography>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                {" "}
                <strong>Code:</strong>{" "}
              </Typography>
              <Box
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  p: 1,
                }}
              >
                <pre>
                  <code>{data.action_code}</code>
                </pre>
              </Box>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>Expected Input:</strong>{" "}
              </Typography>
              <Box
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  p: 1,
                }}
              >
                <pre>
                  <code>{data.action_expected_input}</code>
                </pre>
              </Box>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>Expected Output:</strong>{" "}
              </Typography>
              <Box
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  p: 1,
                }}
              >
                <pre>
                  <code>{data.action_expected_output}</code>
                </pre>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
    
  );
}
