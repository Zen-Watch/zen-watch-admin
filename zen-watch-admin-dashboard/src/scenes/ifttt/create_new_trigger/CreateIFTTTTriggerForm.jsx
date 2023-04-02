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


/*
/*
  To make this component full screen, do the following from L180-188
  <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
          width: "98%",
        }}
      >
        <Paper sx={{ padding: 2, minWidth: 400, width: "98%" }}>
*/
export default function CreateIFTTTTriggerForm() {
  const email = useAppSelector((state) => state.app.email);
  const [isPushMechanism, setIsPushMechanism] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const [targetResourceName, setTargetResourceName] = useState("");
  const [targetResourceNameList, setTargetResourceNameList] = useState([]);
  const [triggerName, setTriggerName] = useState("");
  const [triggerDescription, setTriggerDescription] = useState("");
  const [triggerCode, setTriggerCode] = useState("");

  const navigate = useNavigate();

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

  async function create_ifttt_trigger_definition() {
    const create_ifttt_trigger_definition_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/create/trigger_definition`;
    const payload = {
      email: email,
      is_public: isPublic,
      is_approved: false,
      is_trusted_source: true,
      is_compute_intensive: false,
      is_push_mechanism: isPushMechanism,
      target_resource_name: targetResourceName,
      trigger_name: triggerName,
      trigger_description: triggerDescription,
      trigger_signature: TBD,
      trigger_signature_description: TBD,
      trigger_code: triggerCode,
      trigger_code_description: TBD,
      trigger_expected_input: TBD,
      trigger_expected_input_description: TBD,
      trigger_expected_output: TBD,
      trigger_expected_output_description: TBD,
    };
    const result = await make_api_request(
      create_ifttt_trigger_definition_url,
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

        setTargetResourceNameList(result.message);
        if (result.message.length > 0) {
          setTargetResourceName(result.message[0].target_resource_name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);

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

  const handleTriggerDescriptionChange = (event) => {
    setTriggerDescription(event.target.value);
  };

  const handleTriggerCodeChange = (event) => {
    setTriggerCode(event.target.value);
  };

  const handleTriggerSubmit = async () => {
    const resp = create_ifttt_trigger_definition();
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
          message: "You successfully submitted an IFTTT trigger function for review!",
          submessage: "Check the trigger section of your submissions page for the status of your submission."
        },
      });
    })
    .catch((err) => {
      console.log(err);
      navigate("/status_page", {
        state: {
          status: ERROR,
          message: "You IFTTT trigger function submission failed!",
          submessage: "Please contact support@zen.watch or contact us on our discord channel."
        },
      });
    });
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Create Trigger
        </Typography>
      </Box>

      <CreateCodeExternalLinkCallout data= {{title: 'Want to develop your own trigger code?', subtitle: 'Fork the developer starter kit and start coding!'}}/>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
          width: "98%",
        }}
      >
        <Paper sx={{ padding: 2, minWidth: 400, width: "98%" }}>
          {/* <Box sx={{ marginBottom: 2 }}>
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
          </Box> */}

          <Box sx={{ marginBottom: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPublic}
                  onChange={handleIsPublicChange}
                  name="isPublic"
                />
              }
              label="Is Public? (Others can reuse this definition to create their own IFTTT Recipes)"
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
              id="trigger-name"
              label="Trigger Description"
              variant="outlined"
              fullWidth
              value={triggerDescription}
              onChange={handleTriggerDescriptionChange}
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
