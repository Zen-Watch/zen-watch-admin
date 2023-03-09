import { Box, Typography, Paper } from "@mui/material";
import {get_ifttt_batch_processing_status, mask_action_id_from_action_info} from '../../../../util/ifttt/ifttt_util.methods';

export default function IFTTTActionRunHistoryProfile(props) {
  const data = props.data;

  return (
    <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Action Activation Details
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Box sx={{ mr: 4 }}>
          <Paper sx={{ padding: 2 }}>

          <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>Action Run Status:</strong>
              </Typography>
              <Typography variant="body1">
                {get_ifttt_batch_processing_status(data.action_run_status)}
              </Typography>
            </Box>

          <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>IFTTT Action Name:</strong>{" "}
              </Typography>
              <Typography variant="body1">
                {data.ifttt_action_name}
              </Typography>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>Action Target Resource Name:</strong>{" "}
              </Typography>
              <Typography variant="body1">
                {data.action_target_resource_name}
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
              <Typography variant="subtitle2" color="red"> Input to your action activation / run. Combines your custom input and trigger output. </Typography>
              <Box sx={{ backgroundColor: "black", color: "white", p: 1 }}>
                <pre>
                  <code>{mask_action_id_from_action_info(data.action_run_info)}</code>
                </pre>
              </Box>
            </Box>
            
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2">
                <strong>Action Run Output:</strong>
              </Typography>
              <Typography variant="subtitle2" color="red"> Output of your action activation / run. </Typography>
              <Box sx={{ backgroundColor: "black", color: "white", p: 1 }}>
                <pre>
                  <code>{JSON.stringify(data.action_run_output, null, 2)}</code>
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
