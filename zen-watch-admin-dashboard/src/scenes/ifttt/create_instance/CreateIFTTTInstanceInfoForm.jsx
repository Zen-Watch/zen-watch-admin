import { useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateIFTTTInstanceInfoForm() {
  const [isTriggerTrustedSource, setIsTriggerTrustedSource] = useState(true);
  const [isTriggerComputeIntensive, setIsTriggerComputeIntensive] = useState(
    false
  );
  const [isTriggerPushMechanism, setIsTriggerPushMechanism] = useState(true);
  const [triggerTargetResourceName, setTriggerTargetResourceName] =
    useState("polygon_mainnet");
  const [iftttInstanceName, setIftttInstanceName] = useState(
    "erc20_inbound_transfer_post_webhook_feb_21_2023"
  );
  const [iftttInstanceDescription, setIftttInstanceDescription] = useState(
    "If there is an erc20 deposit, call my pre-configured webhooks"
  );
  const [iftttInstanceIsOn, setIftttInstanceIsOn] = useState(true);

  const navigate = useNavigate();

  const handleIsTriggerTrustedSourceChange = (event) => {
    setIsTriggerTrustedSource(event.target.checked);
  };

  const handleIsTriggerComputeIntensiveChange = (event) => {
    setIsTriggerComputeIntensive(event.target.checked);
  };

  const handleIsTriggerPushMechanismChange = (event) => {
    setIsTriggerPushMechanism(event.target.checked);
  };

  const handleTriggerTargetResourceNameChange = (event) => {
    setTriggerTargetResourceName(event.target.value);
  };

  const handleIftttInstanceNameChange = (event) => {
    setIftttInstanceName(event.target.value);
  };

  const handleIftttInstanceDescriptionChange = (event) => {
    setIftttInstanceDescription(event.target.value);
  };

  const handleIftttInstanceIsOnChange = (event) => {
    setIftttInstanceIsOn(event.target.checked);
  };

  const handleNextClick = () => {
    const outputJson = {
      is_trigger_trusted_source: isTriggerTrustedSource,
      is_trigger_compute_intensive: isTriggerComputeIntensive,
      is_trigger_push_mechanism: isTriggerPushMechanism,
      trigger_target_resource_name: triggerTargetResourceName,
      ifttt_instance_name: iftttInstanceName,
      ifttt_instance_description: iftttInstanceDescription,
      ifttt_instance_is_on: iftttInstanceIsOn,
    };
    navigate("/create_ifttt_select_trigger", { state: { outputJson: outputJson } });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Enter Instance Details
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Paper sx={{ padding: 2, minWidth: 400 }}>
          <Box sx={{ marginBottom: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isTriggerTrustedSource}
                  onChange={handleIsTriggerTrustedSourceChange}
                  name="isTriggerTrustedSource"
                />
              }
              label="Is the trigger a trusted source?"
            />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isTriggerComputeIntensive}
                  onChange={handleIsTriggerComputeIntensiveChange}
                  name="isTriggerComputeIntensive"
                />
              }
              label="Is the trigger compute intensive?"
            />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isTriggerPushMechanism}
                  onChange={handleIsTriggerPushMechanismChange}
                  name="isTriggerPushMechanism"
                />
              }
              label="Does the trigger use a push mechanism?"
            />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="target-resource-select-label">
                Target Resource
              </InputLabel>
              <Select
                labelId="target-resource-select-label"
                id="target-resource-select"
                value={triggerTargetResourceName}
                label="Target Resource"
                onChange={handleTriggerTargetResourceNameChange}
              >
                <MenuItem value="polygon_mainnet">Polygon Mainnet</MenuItem>
                <MenuItem value="polygon_testnet">Polygon Testnet</MenuItem>
                <MenuItem value="ethereum_mainnet">Ethereum Mainnet</MenuItem>
                <MenuItem value="ethereum_testnet">Ethereum Testnet</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              id="ifttt-instance-name"
              label="IFTTT Instance Name"
              variant="outlined"
              fullWidth
              value={iftttInstanceName}
              onChange={handleIftttInstanceNameChange}
            />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              id="ifttt-instance-description"
              label="IFTTT Instance Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={iftttInstanceDescription}
              onChange={handleIftttInstanceDescriptionChange}
            />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={iftttInstanceIsOn}
                  onChange={handleIftttInstanceIsOnChange}
                  name="iftttInstanceIsOn"
                />
              }
              label="Is the IFTTT instance on?"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
            }}
          >
            <Button variant="contained" onClick={handleNextClick}>
              Next
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
