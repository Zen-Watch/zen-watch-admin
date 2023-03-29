// ChatGPTCodeGenerator.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { make_api_request } from "../../../util/common_util.methods";
import { STATUS_OK, UNAUTHORIZED_ACCESS } from "../../../util/constants";

const CHATGPT_API_URL = "https://api.example.com/chatgpt/generate_code";
const TRIGGER_TYPES = [
  { value: "triggerType1", label: "Trigger Type 1" },
  { value: "triggerType2", label: "Trigger Type 2" },
  { value: "triggerType3", label: "Trigger Type 3" },
];

export default function ChatGPTCodeGenerator() {
  const [triggerType, setTriggerType] = useState("");
  const [triggerDefinition, setTriggerDefinition] = useState("");
  const [promptText, setPromptText] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    if (triggerType) {
      fetchTriggerDefinition(triggerType);
    }
  }, [triggerType]);

  const handleChange = (event) => {
    setTriggerType(event.target.value);
  };

  const handlePromptChange = (event) => {
    setPromptText(event.target.value);
  };

  const handleAskGPT = async () => {
    try {
      const response = await make_api_request({
        url: CHATGPT_API_URL,
        method: "POST",
        data: { triggerType, promptText },
      });

      if (response.status === STATUS_OK) {
        setGeneratedCode(response.data.generatedCode);
      } else if (response.status === UNAUTHORIZED_ACCESS) {
        // Handle unauthorized access error
      } else {
        // Handle other API errors
      }
    } catch (error) {
      // Handle network errors
    }
  };

  async function fetchTriggerDefinition(triggerType) {
    try {
      const response = await make_api_request({
        url: `https://api.example.com/chatgpt/trigger_definitions/${triggerType}`,
        method: "GET",
      });

      if (response.status === STATUS_OK) {
        setTriggerDefinition(response.data.triggerDefinition);
      } else if (response.status === UNAUTHORIZED_ACCESS) {
        // Handle unauthorized access error
      } else {
        // Handle other API errors
      }
    } catch (error) {
      // Handle network errors
    }
  }

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          ChatGPT Code Generator
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Powered by gpt-3.5-turbo
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
            <FormControl fullWidth variant="outlined">
              <InputLabel id="trigger-type-label">Trigger Type</InputLabel>
              <Select
                labelId="trigger-type-label"
                id="trigger-type"
                value={triggerType}
                onChange={handleChange}
                label="Trigger Type"
              >
                {TRIGGER_TYPES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              id="prompt-text"
              label="Prompt Text"
              variant="outlined"
              fullWidth
              multiline // Set the multiline prop to enable multiple lines
              rows={4} // Set the rows prop to the desired height (in this case, 4 lines)
              value={promptText}
              onChange={handlePromptChange}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
            }}
          >
            <Button variant="contained" onClick={handleAskGPT}>
              Ask GPT
            </Button>
          </Box>

          <Box sx={{ marginBottom: 2, marginTop: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Trigger Definition
            </Typography>
            <pre>{triggerDefinition}</pre>
          </Box>

          <Box sx={{ marginBottom: 2, marginTop: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Generated Code
            </Typography>
            <pre>{generatedCode}</pre>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
