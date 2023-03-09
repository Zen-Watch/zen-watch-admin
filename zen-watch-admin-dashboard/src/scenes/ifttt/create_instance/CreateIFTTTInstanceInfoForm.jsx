import { useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateIFTTTInstanceInfoForm() {
  const [iftttInstanceName, setIftttInstanceName] = useState("");
  const [iftttInstanceDescription, setIftttInstanceDescription] = useState("");
  const [iftttInstanceIsOn, setIftttInstanceIsOn] = useState(true);

  const navigate = useNavigate();

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
      ifttt_instance_name: iftttInstanceName,
      ifttt_instance_description: iftttInstanceDescription,
      ifttt_instance_is_on: iftttInstanceIsOn,
    };
    // there can be only one trigger, but multiple actions - like send an email and update google sheets
    const action_count = 0;
    navigate("/create_ifttt_select_trigger", { state: { outputJson: outputJson, action_count } });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Enter Recipe Details
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Paper sx={{ padding: 2, minWidth: 400 }}>

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              id="ifttt-instance-name"
              label="IFTTT Recipe Name"
              variant="outlined"
              fullWidth
              value={iftttInstanceName}
              onChange={handleIftttInstanceNameChange}
            />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              id="ifttt-instance-description"
              label="IFTTT Recipe Description"
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
              label="Activate this instance on creation?"
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
