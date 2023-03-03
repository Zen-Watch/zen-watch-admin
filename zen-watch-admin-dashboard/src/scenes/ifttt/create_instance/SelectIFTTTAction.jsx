import { useState, useEffect } from "react";
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
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { make_api_request } from "../../../util/common_util.methods";
import { STATUS_OK, UNAUTHORIZED_ACCESS } from "../../../util/constants";

export default function SelectIFTTTAction() {
  const location = useLocation();
  console.log("location SelectIFTTTAction - ", location, location.state);
  const email = useAppSelector((state) => state.app.email);
  const [targetResourceNames, setTargetResourceNames] = useState([]);
  const [selectedTargetResourceName, setSelectedTargetResourceName] =
    useState("");
  const [triggers, setTriggers] = useState([]);
  const [selectedTriggerDefinition, setSelectedTriggerDefinition] =
    useState(null);
  const [outputJson, setOutputJson] = useState({});
  const [outputJsonFiltered, setOutputJsonFiltered] = useState({});
  const [rawTriggerInput, setRawTriggerInput] = useState({});
  const navigate = useNavigate();

  async function fetch_target_resource_names_for_public_triggers(email) {
    const fetch_ifttt_target_resource_names_for_public_triggers_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/fetch/unique/public/trigger/target_resource_names`;
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
    console.log(
      "fetching target resource names for public triggers on load -",
      email
    );
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
        console.log("result success setTargetResourceNames - ", result);
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
    const fetch_ifttt_public_trigger_definitions_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/fetch/public/trigger_definitions`;
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
    console.log(
      "fetching public trigger definitions for email, selectedTargetResourceName -",
      email,
      selectedTargetResourceName
    );
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
        console.log("result success setTriggers - ", result);
        setTriggers(result.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email, selectedTargetResourceName]);

  // This is to reduce the cognitive overload of the user, by abstracting implementation details
  useEffect(() => {
    // Check if the 'trigger_info.trigger_id' field exists in the original JSON object
    if (outputJson?.trigger_info?.trigger_id) {
      // Copy the original JSON object to a new object with the 'trigger_info.trigger_id' field removed
      const newJson = { ...outputJson };
      delete newJson.trigger_info.trigger_id;
      setOutputJsonFiltered(newJson);
    } else {
      // If the 'trigger_info.trigger_id' field doesn't exist, copy the original JSON object as is
      setOutputJsonFiltered({ ...outputJson });
    }
  }, [outputJson]);

  const handleResourceChange = (event) => {
    setSelectedTargetResourceName(event.target.value);
  };

  const handleTriggerChange = (event) => {
    const selectedTriggerDefinitionId = event.target.value;
    const selectedTriggerDefinition = triggers.find(
      (trigger) => trigger.id === selectedTriggerDefinitionId
    );
    setSelectedTriggerDefinition(selectedTriggerDefinition);
    // If you change the trigger reset the json and raw input
    setOutputJson({
      trigger_target_resource_name: selectedTriggerDefinition.target_resource_name,
      trigger_info: {
        trigger_id: selectedTriggerDefinition.id,
        params: {
        }
      },
    });
  };

  const handleRawInputChange = (event) => {
    const rawInput = event.target.value;
    setRawTriggerInput(rawInput);
  };

  const parseCommaSeparatedString = (str) => {
    const object = str.split(',').reduce((acc, curr) => {
      const [key, value] = curr.trim().split(':');
      acc[key] = value.trim();
      return acc;
    }, {});
    return object; //If required,  JSON.stringify(object, null, 2);
  }
  
  const handleAddParameters = () => {
    const rawInput = rawTriggerInput;
    try {
      const parsedInput = parseCommaSeparatedString(rawInput);
      const outputJsonCopy = JSON.parse(JSON.stringify(outputJson));
      outputJsonCopy.trigger_info.params = parsedInput;
      setOutputJson(outputJsonCopy);
      setRawTriggerInput("");
    } catch (err) {
      alert("Invalid input, please check your input and try again!");
      return;
    }
  };

  const handleAnotherAction = () => {
    console.log('passed on - ', outputJson);
    navigate("/trigger-details", {
      state: { outputJson: outputJson },
    });
  };

  const handleNextClick = () => {
    console.log('passed on - ', outputJson);
    navigate("/trigger-details", {
      state: { outputJson: outputJson },
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Select Action
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
                    <strong>Signature:</strong>
                  </Typography>
                  <Typography variant="body1">
                    {selectedTriggerDefinition.trigger_signature}
                  </Typography>
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle2">
                    <strong>Signature Description:</strong>
                  </Typography>
                  <Typography variant="body1">
                    {selectedTriggerDefinition.trigger_signature_description}
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
                      <code>{selectedTriggerDefinition.trigger_code}</code>
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
                      <code>
                        {selectedTriggerDefinition.trigger_expected_input}
                      </code>
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
                      <code>
                        {selectedTriggerDefinition.trigger_expected_output}
                      </code>
                    </pre>
                  </Box>
                </Box>
              </Box>
            )}
          </Paper>
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
              <textarea
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
              <Button sx={{ marginRight: 2 }} variant="contained" onClick={handleAddParameters}>
                Add Parameters
              </Button>
              <Button sx={{ marginRight: 2 }} variant="contained" onClick={handleAnotherAction}>
                Add Another Action
              </Button>
              <Button variant="contained" onClick={handleNextClick}>
                Create Instance
              </Button>
            </Box>
          </Paper>

          {outputJson && (
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h6" gutterBottom>
                <strong>Your IFTTT Instance</strong>
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
                {JSON.stringify(outputJsonFiltered, null, 2)}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
