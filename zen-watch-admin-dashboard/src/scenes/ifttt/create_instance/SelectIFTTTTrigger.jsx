import { useState, useEffect } from "react";
import { tokens } from "../../../theme";

import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Paper,
  useTheme,
  Collapse,
} from "@mui/material";
import { FileCopy } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { make_api_request } from "../../../util/common_util.methods";
import { STATUS_OK, UNAUTHORIZED_ACCESS } from "../../../util/constants";
import { cleanAndParseJSON } from "../../../util/ifttt/ifttt_util.methods";
import ShowIFTTTTriggerDefinitionCode from "./ShowIFTTTTriggerDefinitionCode";

function ShowCodeButton({ onClick, expanded }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: expanded ? colors.grey[100] : "orange",
        color: expanded ? colors.grey[900] : colors.grey[100],
        fontWeight: "bold",
        width: "100%",
        marginBottom: 2,
        "&:hover": {
          bgcolor: expanded ? colors.grey[200] : "#1976d2",
        },
      }}
    >
      {expanded ? "Hide Code" : "Show Code"}
    </Button>
  );
}

export default function SelectIFTTTTrigger() {
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const email = useAppSelector((state) => state.app.email);
  const [targetResourceNames, setTargetResourceNames] = useState([]);
  const [selectedTargetResourceName, setSelectedTargetResourceName] =
    useState("");
  const [triggers, setTriggers] = useState([]);
  const [selectedTriggerDefinition, setSelectedTriggerDefinition] =
    useState(null);
  const [outputJson, setOutputJson] = useState({});
  const [rawTriggerInput, setRawTriggerInput] = useState({});
  const navigate = useNavigate();

  const [copySuccess, setCopySuccess] = useState("");

  const [showCode, setShowCode] = useState(false);

  const [initialOutputJson, setInitialOutputJson] = useState(location.state.outputJson);


  // handle reset to defafult state function
  const resetToDefault = () => {
    setSelectedTargetResourceName("");
    setSelectedTriggerDefinition(null);
    const _tempInitialOutputJson = JSON.parse(JSON.stringify(initialOutputJson));
    setOutputJson(_tempInitialOutputJson);
    setRawTriggerInput("");
    document.getElementById("trigger-input").value = ""; // clear trigger input
    setShowCode(false);
  };

  const handleShowCodeClick = () => {
    setShowCode(!showCode);
  };

  function copyToClipboard(textToCopy) {
    navigator.clipboard.writeText(textToCopy);
    setCopySuccess("Copied to clipboard!");
  }

  async function fetch_target_resource_names_for_public_triggers(email) {
    const fetch_ifttt_target_resource_names_for_public_triggers_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/fetch/trigger_target_resource_name`;
    const payload = { email };
    const result = await make_api_request(
      fetch_ifttt_target_resource_names_for_public_triggers_url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-api-key": process.env.REACT_APP_ZEN_WATCH_DEV_API_KEY,
        },
        body: JSON.stringify(payload),
      }
    );
    return result;
  }

  useEffect(() => {
    if (location?.state?.outputJson) {
      const _temp = JSON.parse(JSON.stringify(location.state.outputJson));
      setInitialOutputJson(_temp);
      setOutputJson(_temp);
    }
  }, [location]);

  useEffect(() => {
    const resp = fetch_target_resource_names_for_public_triggers(email);
    resp
      .then((result) => {
        if (result.status === UNAUTHORIZED_ACCESS) {
          alert(
            "Unauthorized access, please check your api key or contact support!"
          );
          return;
        } else if (result.status !== STATUS_OK) {
          alert("API Error, please contact support.");
          return;
        }
        setTargetResourceNames(result.message);
        if (result.message.length > 0) {
          setSelectedTargetResourceName(result.message[0].target_resource_name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);

  async function fetch_public_trigger_definitions(
    email,
    selectedTargetResourceName
  ) {
    const fetch_ifttt_public_trigger_definitions_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/fetch/public/approved/trigger_definitions`;
    const payload = {
      email: email,
      target_resource_name: selectedTargetResourceName,
    };
    const result = await make_api_request(
      fetch_ifttt_public_trigger_definitions_url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-api-key": process.env.REACT_APP_ZEN_WATCH_DEV_API_KEY,
        },
        body: JSON.stringify(payload),
      }
    );
    return result;
  }

  useEffect(() => {
    const resp = fetch_public_trigger_definitions(
      email,
      selectedTargetResourceName
    );
    resp
      .then((result) => {
        if (result.status === UNAUTHORIZED_ACCESS) {
          alert(
            "Unauthorized access, please check your api key or contact support!"
          );
          return;
        } else if (result.status !== STATUS_OK) {
          alert("API Error, please contact support.");
          return;
        }
        setTriggers(result.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email, selectedTargetResourceName]);

  const handleResourceChange = (event) => {
    resetToDefault();
    setSelectedTargetResourceName(event.target.value);
  };

  const handleTriggerChange = (event) => {

    const selectedTriggerDefinitionId = event.target.value;
    const selectedTriggerDefinition = triggers.find(
      (trigger) => trigger.id === selectedTriggerDefinitionId
    );
    setSelectedTriggerDefinition(selectedTriggerDefinition);
    // If you change the trigger reset the json and raw input

    const _tempInitialOutputJson = JSON.parse(JSON.stringify(initialOutputJson));

    const _trigger_output_json = {
      ..._tempInitialOutputJson,
      is_trigger_trusted_source: selectedTriggerDefinition.is_trusted_source,
      is_trigger_compute_intensive:
        selectedTriggerDefinition.is_compute_intensive,
      is_trigger_push_mechanism: selectedTriggerDefinition.is_push_mechanism,
      trigger_target_resource_name:
        selectedTriggerDefinition.target_resource_name,
      trigger_info: {
        trigger_id: selectedTriggerDefinition.id,
        params: {},
      },
      actions_info: [],
    };
    setOutputJson(_trigger_output_json);
    setShowCode(false);
  };

  const handleRawInputChange = (event) => {
    const rawInput = event.target.value;
    setRawTriggerInput(rawInput);
  };

  const handleAddParameters = () => {
    try {
      const parsedInput = cleanAndParseJSON(rawTriggerInput);
      const outputJsonCopy = JSON.parse(JSON.stringify(outputJson));
      outputJsonCopy.trigger_info.params = parsedInput;
      setOutputJson(outputJsonCopy);
      setRawTriggerInput("");
      document.getElementById("trigger-input").value = ""; // clear trigger input
    } catch (err) {
      console.log(err);
      alert("Invalid input, please check your input and try again!");
      return;
    }
  };

  const handleNextClick = () => {
    setShowCode(false);
    setRawTriggerInput("");
    document.getElementById("trigger-input").value = ""; // clear trigger input
    navigate("/create_ifttt_select_action", {
      state: {
        outputJson: outputJson,
        action_count: location.state.action_count,
      },
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Select Trigger
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Box sx={{ mr: 4 }}>
          <Paper sx={{ padding: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="resource-select-label">Resource</InputLabel>
                <Select
                  labelId="resource-select-label"
                  id="resource-select"
                  value={selectedTargetResourceName}
                  label="Resource"
                  onChange={handleResourceChange}
                >
                  {targetResourceNames.map((resource, index) => (
                    <MenuItem key={index} value={resource.target_resource_name}>
                      {resource.target_resource_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 240 }}>
                <InputLabel id="trigger-select-label">Trigger</InputLabel>
                <Select
                  labelId="trigger-select-label"
                  id="trigger-select"
                  value={selectedTriggerDefinition?.id || ""}
                  label="Trigger"
                  onChange={handleTriggerChange}
                  disabled={triggers.length === 0}
                >
                  {triggers.map((trigger) => (
                    <MenuItem key={trigger.id} value={trigger.id}>
                      {trigger.trigger_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {selectedTriggerDefinition && (
              <Box sx={{ marginTop: 4 }}>
                <Divider sx={{ marginBottom: 2 }} />

                <Typography variant="h6" gutterBottom>
                  <strong>Trigger Details</strong>
                </Typography>

                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle2">
                    <strong>Name:</strong>
                  </Typography>
                  <Typography variant="body1">
                    {selectedTriggerDefinition.trigger_name}
                  </Typography>
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle2">
                    <strong>Description:</strong>
                  </Typography>
                  <Typography variant="body1">
                    {selectedTriggerDefinition.trigger_description}
                  </Typography>
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle2">
                    <strong>Expected Input:</strong>{" "}
                    <Button
                      onClick={() =>
                        copyToClipboard(
                          selectedTriggerDefinition.trigger_expected_input
                        )
                      }
                      variant="outlined"
                      size="small"
                      startIcon={<FileCopy />}
                      sx={{
                        border: "none",
                        borderBottom: "1px solid",
                        marginBottom: "-1px",
                        borderRadius: "0px",
                        cursor: "pointer",
                      }}
                    >
                      Copy to clipboard
                    </Button>
                    {copySuccess}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      p: 1,
                    }}
                  >
                    <pre>
                      <code>
                        {selectedTriggerDefinition.trigger_expected_input}
                      </code>
                    </pre>
                  </Box>
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle2">
                    <strong>Expected Input Description:</strong>
                  </Typography>
                  <Typography variant="body1">
                    {
                      selectedTriggerDefinition.trigger_expected_input_description
                    }
                  </Typography>
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
                      <code>
                        {selectedTriggerDefinition.trigger_expected_output}
                      </code>
                    </pre>
                  </Box>
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle2">
                    <strong>Expected Output Description:</strong>
                  </Typography>
                  <Typography variant="body1">
                    {
                      selectedTriggerDefinition.trigger_expected_output_description
                    }
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>

          {selectedTriggerDefinition && (
            <Box sx={{ marginTop: 4 }}>
              <ShowCodeButton
                onClick={handleShowCodeClick}
                expanded={showCode}
              />
              <Collapse in={showCode}>
                <Paper sx={{ padding: 2 }}>
                  <ShowIFTTTTriggerDefinitionCode
                    selectedTriggerDefinition={selectedTriggerDefinition}
                    showCode={showCode}
                  />
                </Paper>
              </Collapse>
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Paper sx={{ padding: 2, minWidth: 300 }}>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Trigger Inputs</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Enter trigger input here:
              </Typography>
              <Typography variant="body2" gutterBottom>
                Comma separated payload inputs, new lines accepted - Ex., a:1,
                b:2
              </Typography>
              <textarea
                id="trigger-input"
                rows={5}
                cols={50}
                onChange={handleRawInputChange}
              ></textarea>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 2,
              }}
            >
              <Button
                sx={{ marginRight: 2 }}
                variant="contained"
                onClick={handleAddParameters}
              >
                Add Parameters
              </Button>
              <Button
                sx={{
                  backgroundColor: "orange",
                  color: colors.grey[100],
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#1976d2",
                  },
                }}
                variant="contained"
                onClick={handleNextClick}
              >
                Add Action
              </Button>
            </Box>
          </Paper>

          {outputJson && (
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h6" gutterBottom>
                <strong>Your IFTTT Recipe</strong>
              </Typography>

              <Box
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  p: 2,
                  minWidth: 300,
                  minHeight: 200,
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                {JSON.stringify(outputJson, null, 2)}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
