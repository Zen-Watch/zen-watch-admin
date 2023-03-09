import { Box, Typography, Paper } from "@mui/material";
import {get_ifttt_batch_processing_status, mask_trigger_id_from_trigger_info} from '../../../../util/ifttt/ifttt_util.methods';

export default function IFTTTTriggerRunHistoryProfile(props) {
  const data = props.data;

  return (
    <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Trigger Activation Details
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Box sx={{ mr: 4 }}>
          <Paper sx={{ padding: 2 }}>

          <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>Trigger Run Status:</strong>
              </Typography>
              <Typography variant="body1">
                {get_ifttt_batch_processing_status(data.trigger_run_status)}
              </Typography>
            </Box>

          <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>IFTTT Trigger Name:</strong>{" "}
              </Typography>
              <Typography variant="body1">
                {data.ifttt_trigger_name}
              </Typography>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>Trigger Target Resource Name:</strong>{" "}
              </Typography>
              <Typography variant="body1">
                {data.trigger_target_resource_name}
              </Typography>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>IFTTT Recipe Name:</strong>{" "}
              </Typography>
              <Typography variant="body1">
                {data.ifttt_instance_name}
              </Typography>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>Trigger Run Info:</strong>
              </Typography>
              <Typography variant="subtitle2" color="red"> Input that triggered your IFTTT recipe </Typography>
              <Box sx={{ backgroundColor: "black", color: "white", p: 1 }}>
                <pre>
                  <code>{mask_trigger_id_from_trigger_info(data.trigger_run_info)}</code>
                </pre>
              </Box>
            </Box>
            
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>Trigger Run Output:</strong>
              </Typography>
              <Typography variant="subtitle2" color="red"> Output from your trigger action / run </Typography>
              <Box sx={{ backgroundColor: "black", color: "white", p: 1 }}>
                <pre>
                  <code>{JSON.stringify(data.trigger_run_output, null, 2)}</code>
                </pre>
              </Box>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>Created Timestamp:</strong>{" "}
              </Typography>
              <Typography variant="body1">{data.created_ts}</Typography>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>Updated Timestamp:</strong>{" "}
              </Typography>
              <Typography variant="body1">{data.updated_ts}</Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
