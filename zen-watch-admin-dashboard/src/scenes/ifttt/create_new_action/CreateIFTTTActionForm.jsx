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
import { useAppSelector } from "../../../app/hooks";
import { make_api_request } from "../../../util/common_util.methods";
import { STATUS_OK, UNAUTHORIZED_ACCESS, TBD, SUCCESS, ERROR } from "../../../util/constants";
import CreateCodeExternalLinkCallout from "../create_code_callout/CreateCodeExternalLinkCallout";


export default function CreateIFTTTActionForm() {
  const email = useAppSelector((state) => state.app.email);
  const [isPublic, setIsPublic] = useState(true);
  const [targetResourceName, setTargetResourceName] = useState("");
  const [targetResourceNameList, setTargetResourceNameList] = useState([]);
  const [actionName, setActionName] = useState("");
  const [actionDescription, setActionDescription] = useState("");
  const [actionCode, setActionCode] = useState("");

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

  async function create_ifttt_action_definition() {
    const create_ifttt_action_definition_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/create/action_definition`;
    const payload = {
      email: email,
      is_public: isPublic,
      is_approved: false,
      is_trusted_source: true,
      is_compute_intensive: false,
      target_resource_name: targetResourceName,
      action_name: actionName,
      action_description: actionDescription,
      action_signature: TBD,
      action_signature_description: TBD,
      action_code: actionCode,
      action_code_description: TBD,
      action_expected_input: TBD,
      action_expected_input_description: TBD,
      action_expected_output: TBD,
      action_expected_output_description: TBD,
    };
    const result = await make_api_request(
      create_ifttt_action_definition_url,
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

        setTargetResourceNameList(result.message);
        if (result.message.length > 0) {
          setTargetResourceName(result.message[0].target_resource_name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);

  const handleIsPublicChange = (event) => {
    setIsPublic(event.target.checked);
  };

  const handleTargetResourceNameChange = (event) => {
    setTargetResourceName(event.target.value);
  };

  const handleActionNameChange = (event) => {
    setActionName(event.target.value);
  };

  const handleActionDescriptionChange = (event) => {
    setActionDescription(event.target.value);
  };

  const handleActionCodeChange = (event) => {
    setActionCode(event.target.value);
  };

  const handleActionSubmit = async () => {
    const resp = create_ifttt_action_definition();
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
          message: "You successfully submitted an IFTTT action function for review!",
          submessage: "Check the action section of your submissions page for the status of your submission."
        },
      });
    })
    .catch((err) => {
      console.log(err);
      navigate("/status_page", {
        state: {
          status: ERROR,
          message: "You IFTTT action function submission failed!",
          submessage: "Please contact support@zen.watch or contact us on our discord channel."
        },
      });
    });
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Create Action
        </Typography>
      </Box>

      {/* <CreateCodeExternalLinkCallout data= {{title: 'Want to develop your own action code?', subtitle: 'Fork the developer starter kit and start coding!'}}/> */}

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
                  checked={isPublic}
                  onChange={handleIsPublicChange}
                  name="isPublic"
                />
              }
              label="Is Public? (Others can reuse this definition to create their own IFTTT recipes)"
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
                <MenuItem key={name.target_resource_name} value={name.target_resource_name}>
                  {name.target_resource_name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              id="action-name"
              label="Action Name"
              variant="outlined"
              fullWidth
              value={actionName}
              onChange={handleActionNameChange}
            />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              id="action-name"
              label="Action Description"
              variant="outlined"
              fullWidth
              value={actionDescription}
              onChange={handleActionDescriptionChange}
            />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              id="action-code"
              label="Action Code"
              variant="outlined"
              fullWidth
              multiline
              rows={10}
              // sx={{ backgroundColor: "#2D2D2D", color: "#FFFFFF" }}
              value={actionCode}
              onChange={handleActionCodeChange}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
            }}
          >
            <Button variant="contained" onClick={handleActionSubmit}>
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
