import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateIFTTTTriggerForm() {
  const [isPushMechanism, setIsPushMechanism] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [targetResourceName, setTargetResourceName] = useState("");
  const [targetResourceNameList, setTargetResourceNameList] = useState([]);
  const [triggerName, setTriggerName] = useState("");
  const [triggerCode, setTriggerCode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch target resource name list from backend API
    const fetchData = async () => {
      try {
        const response = await fetch("/api/target-resource-names");
        const data = await response.json();
        setTargetResourceNameList(data.targetResourceNames);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleIsPushMechanismChange = (event) => {
    setIsPushMechanism(event.target.checked);
  };

  const handleIsPublicChange = (event) => {
    setIsPublic(event.target.checked);
  };

  const handleTargetResourceNameChange = (event) => {
    setTargetResourceName(event.target.value);
  };

  const handleTriggerNameChange = (event) => {
    setTriggerName(event.target.value);
  };

  const handleTriggerCodeChange = (event) => {
    setTriggerCode(event.target.value);
  };

  const handleTriggerSubmit = async () => {
    const trigger = {
      is_push_mechanism: isPushMechanism,
      is_public: isPublic,
      target_resource_name: targetResourceName,
      trigger_name: triggerName,
      trigger_code: triggerCode,
    };
    try {
      const response = await fetch("/api/triggers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trigger),
      });
      if (response.ok) {
        navigate("/triggers");
      } else {
        console.error("Failed to create trigger");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Create Trigger
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
          width: "98%",
        }}
      >
        <Paper sx={{ padding: 2, minWidth: 400, width: "98%" }}>
          <Box sx={{ marginBottom: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPushMechanism}
                  onChange={handleIsPushMechanismChange}
                  name="isPushMechanism"
                />
              }
              label="Is this a Push Mechanism based Trigger (Websockets, Event Driven - Ex., On-chain Events)?"
            />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPublic}
                  onChange={handleIsPublicChange}
                  name="isPublic"
                />
              }
              label="Is Public? (Others can reuse this definition to create their own IFTTT instances)"
            />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              id="target-resource-name"
              select
              label="Target Resource Name"
              variant="outlined"
              fullWidth
              value={targetResourceName}
              onChange={handleTargetResourceNameChange}
            >
              {targetResourceNameList.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              id="trigger-name"
              label="Trigger Name"
              variant="outlined"
              fullWidth
              value={triggerName}
              onChange={handleTriggerNameChange}
            />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              id="trigger-code"
              label="Trigger Code"
              variant="outlined"
              fullWidth
              multiline
              rows={10}
              // sx={{ backgroundColor: "#2D2D2D", color: "#FFFFFF" }}
              value={triggerCode}
              onChange={handleTriggerCodeChange}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
            }}
          >
            <Button variant="contained" onClick={handleTriggerSubmit}>
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
