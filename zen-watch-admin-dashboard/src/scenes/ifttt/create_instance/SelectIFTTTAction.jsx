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
import {
  STATUS_OK,
  SUCCESS,
  UNAUTHORIZED_ACCESS,
  ERROR,
} from "../../../util/constants";
import { cleanAndParseJSON } from "../../../util/ifttt/ifttt_util.methods";
import ShowIFTTTActionDefinitionCode from "./ShowIFTTTActionDefinitionCode";

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
  const [rawActionInput, setRawActionInput] = useState({});
  const navigate = useNavigate();
  const [copySuccess, setCopySuccess] = useState("");

  const [showCode, setShowCode] = useState(false);

  const [initialOutputJson, setInitialOutputJson] = useState(location.state.outputJson);


  // reset to default function
  const resetToDefault = () => {
    setSelectedActionDefinition(null);
    const _tempInitialOutputJson = JSON.parse(JSON.stringify(initialOutputJson));
    setOutputJson(_tempInitialOutputJson);
    setRawActionInput("");
    document.getElementById("action-input").value = ""; // clear action input
    setShowCode(false);
  };

  const handleShowCodeClick = () => {
    setShowCode(!showCode);
  };

  function copyToClipboard(textToCopy) {
    let _textToCopy = textToCopy;
    try {
      const _json = JSON.parse(textToCopy)
      _textToCopy = JSON.stringify(_json.params, null, 2)
    }
    catch (err) {
      console.log(err);
    }
    navigator.clipboard.writeText(_textToCopy);
    setCopySuccess("Copied to clipboard!");
  }

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
      const _temp = JSON.parse(JSON.stringify(location.state.outputJson));
      setInitialOutputJson(_temp);
      setOutputJson(_temp);
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
    resetToDefault();
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
    };

    const _tempInitialOutputJson = JSON.parse(JSON.stringify(initialOutputJson));

    const _action_output_json = {
      ..._tempInitialOutputJson,
    };

    _action_output_json.actions_info.push(new_action_info);
    setOutputJson(_action_output_json);
    setShowCode(false);
  };

  const handleRawInputChange = (event) => {
    const rawInput = event.target.value;
    setRawActionInput(rawInput);
  };

  const handleAddParameters = () => {
    try {
      const parsedInput = cleanAndParseJSON(rawActionInput);
      const outputJsonCopy = JSON.parse(JSON.stringify(outputJson));

      const selected_action_info = outputJsonCopy.actions_info.find(
        (action_info) => action_info.action_id === selectedActionDefinition.id
      );

      selected_action_info.params = parsedInput;
      setOutputJson(outputJsonCopy);
      setRawActionInput("");
      document.getElementById("action-input").value = ""; // clear action input
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
    setShowCode(false);
    removeCurrentActionFromActionsList();
    navigate("/create_ifttt_select_action", {
      state: {
        outputJson: outputJson,
        action_count: location.state.action_count + 1,
      },
    });
    setRawActionInput("");
    document.getElementById("action-input").value = ""; // clear action input
  };

  async function create_ifttt_instance() {
    const create_ifttt_instance_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/create/ifttt_instance`;
    const payload = { email, ...outputJson };
    const result = await make_api_request(create_ifttt_instance_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": process.env.REACT_APP_ZEN_WATCH_DEV_API_KEY,
      },
      body: JSON.stringify(payload),
    });
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
            message: "You successfully created an IFTTT recipe!",
            submessage:
              "Check the run history pages for more details. You can turn on/off anytime from IFTTT recipes page.",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        navigate("/status_page", {
          state: {
            status: ERROR,
            message: "You IFTTT recipe creation failed!",
            submessage:
              "Please contact support@zen.watch or contact us on our discord channel.",
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
                    <strong>Expected Input:</strong>{" "}
                  </Typography>
                  <Typography variant="subtitle1" color="red">
                    Action input contains the user supplied params, as well as trigger output{" "}
                    <Button
                      onClick={() =>
                        copyToClipboard(
                          selectedActionDefinition.action_expected_input
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
                      Copy user params to clipboard
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
                        {selectedActionDefinition.action_expected_input}
                      </code>
                    </pre>
                  </Box>
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle2">
                    <strong>Expected Input Description:</strong>
                  </Typography>
                  <Typography variant="body1">
                    {selectedActionDefinition.action_expected_input_description}
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
                        {selectedActionDefinition.action_expected_output}
                      </code>
                    </pre>
                  </Box>
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle2">
                    <strong>Expected Output Description:</strong>
                  </Typography>
                  <Typography variant="body1">
                    {selectedActionDefinition.action_expected_output_description}
                  </Typography>
                </Box>    

              </Box>
            )}
          </Paper>
          {selectedActionDefinition && (
            <Box sx={{ marginTop: 4 }}>
              <ShowCodeButton
                onClick={handleShowCodeClick}
                expanded={showCode}
              />
              <Collapse in={showCode}>
                <Paper sx={{ padding: 2 }}>
                  <ShowIFTTTActionDefinitionCode
                    selectedActionDefinition={selectedActionDefinition}
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
                <strong>Action Inputs</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Enter action input here:
              </Typography>
              <Typography variant="body2" gutterBottom>
                Comma separated payload inputs, new lines accepted - Ex., a:1,
                b:2
              </Typography>
              <textarea
                id="action-input"
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
                3)
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
                    "&:hover": {
                      bgcolor: "#1976d2",
                    },
                  }}
                  variant="contained"
                  onClick={handleNextClick}
                >
                  Add Another Action
                </Button>
              )}
              <Button
                sx={{
                  backgroundColor: colors.greenAccent[700],
                  color: colors.grey[100],
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#1976d2",
                  },  
                }}
                variant="contained"
                onClick={handleCreateIFTTTInstance}
              >
                Create IFTTT Recipe
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
