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
  useTheme
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { make_api_request } from "../../../util/common_util.methods";
import { STATUS_OK, SUCCESS, UNAUTHORIZED_ACCESS, ERROR } from "../../../util/constants";
import { filter_output_json } from "../../../util/ifttt/ifttt_util.methods";

export default function SelectIFTTTAction() {
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const email = useAppSelector((state) => state.app.email);
  const [targetResourceNames, setTargetResourceNames] = useState([]);
  const [selectedTargetResourceName, setSelectedTargetResourceName] =
    useState("");
  const [actions, setActions] = useState([]);
  const [selectedActionDefinition, setSelectedActionDefinition] =
    useState(null);
  const [outputJson, setOutputJson] = useState({});
  const [outputJsonFiltered, setOutputJsonFiltered] = useState({});
  const [rawActionInput, setRawActionInput] = useState({});
  const navigate = useNavigate();

  async function fetch_target_resource_names_for_public_actions(email) {
    const fetch_ifttt_target_resource_names_for_public_actions_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/fetch/action_target_resource_name`;
    const payload = { email };
    const result = await make_api_request(
      fetch_ifttt_target_resource_names_for_public_actions_url,
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
      setOutputJson(location.state.outputJson);
    }
  }, [location]);

  useEffect(() => {
    const resp = fetch_target_resource_names_for_public_actions(email);
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

  async function fetch_public_action_definitions(
    email,
    selectedTargetResourceName
  ) {
    const fetch_ifttt_public_action_definitions_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/fetch/public/approved/action_definitions`;
    const payload = {
      email: email,
      target_resource_name: selectedTargetResourceName,
    };
    const result = await make_api_request(
      fetch_ifttt_public_action_definitions_url,
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
    const resp = fetch_public_action_definitions(
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
        setActions(result.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email, selectedTargetResourceName]);

  const handleResourceChange = (event) => {
    setSelectedTargetResourceName(event.target.value);
  };

  const handleActionChange = (event) => {
    const selectedActionDefinitionId = event.target.value;
    const selectedActionDefinition = actions.find(
      (action) => action.id === selectedActionDefinitionId
    );
    setSelectedActionDefinition(selectedActionDefinition);
    // If you change the action reset the json and raw input
    
    const new_action_info = {
      action_id: selectedActionDefinitionId,
      params: {},
    }

    const _action_output_json = {
      ...outputJson,
    };

    _action_output_json.actions_info.push(new_action_info);
    setOutputJson(_action_output_json);
  };

  useEffect(() => {
    const copy_json = filter_output_json(outputJson);
    setOutputJsonFiltered(copy_json);
  }, [outputJson]);

  const handleRawInputChange = (event) => {
    const rawInput = event.target.value;
    setRawActionInput(rawInput);
  };

  const handleAddParameters = () => {
    const rawInput = rawActionInput;
    try {
      console.log(rawInput);
      const parsedInput = JSON.parse(rawInput);
      const outputJsonCopy = JSON.parse(JSON.stringify(outputJson));
      
      const selected_action_info = outputJsonCopy.actions_info.find(
        (action_info) => action_info.action_id === selectedActionDefinition.id
      );

      selected_action_info.params = parsedInput;
      setOutputJson(outputJsonCopy);
      setRawActionInput("");
    } catch (err) {
      console.log(err);
      alert("Invalid input, please check your input and try again!");
      return;
    }
  };

  const removeCurrentActionFromActionsList = () => {
    const new_actions_list = actions.filter((action) => action.id !== selectedActionDefinition.id);
    setActions(new_actions_list);
    setSelectedActionDefinition(null);
  }

  const handleNextClick = () => {
    removeCurrentActionFromActionsList();
    navigate("/create_ifttt_select_action", {
      state: {
        outputJson: outputJson,
        action_count: location.state.action_count + 1,
      },
    });
  };

  async function create_ifttt_instance() {
    const create_ifttt_instance_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/create/ifttt_instance`;
    const payload = { email, ...outputJson };
    const result = await make_api_request(
      create_ifttt_instance_url,
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

  const handleCreateIFTTTInstance = () => {
    const resp = create_ifttt_instance();
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
      navigate("/status_page", {
        state: {
          status: SUCCESS,
          message: "You successfully created an IFTTT instance!",
          submessage: "Check the run history pages for more details. You can turn on/off anytime from IFTTT instances page."
        },
      });
    })
    .catch((err) => {
      console.log(err);
      navigate("/status_page", {
        state: {
          status: ERROR,
          message: "You IFTTT instance creation failed!",
          submessage: "Please contact support@zen.watch or contact us on our discord channel."
        },
      });
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
                <InputLabel id="action-select-label">Action</InputLabel>
                <Select
                  labelId="action-select-label"
                  id="action-select"
                  value={selectedActionDefinition?.id || ""}
                  label="Action"
                  onChange={handleActionChange}
                  disabled={actions.length === 0}
                >
                  {actions.map((action) => (
                    <MenuItem key={action.id} value={action.id}>
                      {action.action_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {selectedActionDefinition && (
              <Box sx={{ marginTop: 4 }}>
                <Divider sx={{ marginBottom: 2 }} />

                <Typography variant="h6" gutterBottom>
                  <strong>Action Details</strong>
                </Typography>

                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle2">
                    <strong>Name:</strong>
                  </Typography>
                  <Typography variant="body1">
                    {selectedActionDefinition.action_name}
                  </Typography>
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle2">
                    <strong>Description:</strong>
                  </Typography>
                  <Typography variant="body1">
                    {selectedActionDefinition.action_description}
                  </Typography>
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle2">
                    <strong>Signature:</strong>
                  </Typography>
                  <Typography variant="body1">
                    {selectedActionDefinition.action_signature}
                  </Typography>
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle2">
                    <strong>Signature Description:</strong>
                  </Typography>
                  <Typography variant="body1">
                    {selectedActionDefinition.action_signature_description}
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
                      <code>{selectedActionDefinition.action_code}</code>
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
                        {selectedActionDefinition.action_expected_input}
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
                        {selectedActionDefinition.action_expected_output}
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
                <strong>Action Inputs</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Enter action input here:
              </Typography>
              <Typography variant="body2" gutterBottom>
                Comma separated payload inputs, new lines accepted - Ex., a:1, b:2
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
                marginTop: 2,
              }}
            >
              <Typography variant="body1" gutterBottom>
                Current Action Count: {location.state.action_count} (Max Count:
                2)
              </Typography>
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
              {location.state.action_count < 2 && (
                <Button
                  sx={{ 
                    marginRight: 2,
                    backgroundColor: 'orange', 
                    color: colors.grey[100],
                    fontWeight: "bold",
                  }}
                  variant="contained"
                  onClick={handleNextClick}
                >
                  Add Another Action
                </Button>
              )}
              <Button sx={{               
                backgroundColor: colors.greenAccent[700],
                color: colors.grey[100],
                fontWeight: "bold",
              }}
              variant="contained" onClick={handleCreateIFTTTInstance}>
                Create IFTTT Instance
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
