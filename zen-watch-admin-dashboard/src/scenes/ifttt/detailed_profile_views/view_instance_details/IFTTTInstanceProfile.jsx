import { useEffect, useState } from "react";
import { tokens } from "../../../../theme";
import {
  Typography,
  Grid,
  Paper,
  Divider,
  Button,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import { make_api_request } from "../../../../util/common_util.methods";
import { STATUS_OK, UNAUTHORIZED_ACCESS } from "../../../../util/constants";

export default function IFTTTInstanceProfile({ data }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const email = useAppSelector((state) => state.app.email);

  // Fetch Instance Details from the props
  const {
    id,
    ifttt_instance_is_on,
    ifttt_instance_name,
    ifttt_instance_description,
    created_ts,
    updated_ts,
    trigger_info,
    actions_info,
  } = data;

  const [triggerData, setTriggerData] = useState(undefined);
  const [actionsData, setActionsData] = useState(undefined);
  const [showDetails, setShowDetails] = useState(false);

  // Toggle Instance Status
  async function update_iftt_instance_status(email, instance_id, new_instance_status) {
    const update_iftt_instance_status_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/update/ifttt_instance/status`;
    const payload = {
      email,
      instance_id,
      new_instance_status
    };
    const result = await make_api_request(update_iftt_instance_status_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": process.env.REACT_APP_ZEN_WATCH_DEV_API_KEY,
      },
      body: JSON.stringify(payload),
    });
    return result;
  }

  // we send the complement of the current state to the backend, to turn off if it's on and vice versa
  const handleTurnOffOnSwitchButtonClick = (
    _instance_id,
    new_instance_status
  ) => {
    const resp = update_iftt_instance_status(email, _instance_id, new_instance_status);
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
        navigate("/ifttt_instances");
      })
      .catch((err) => {
        console.log(err);
        alert(
          "Status update error. Please contact support@zen.watch for help."
        );
      });
    // handle button click here
  };

  // Fetch Trigger Definition
  async function fetch_trigger_definition(email, trigger_id) {
    const fetch_ifttt_trigger_details_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/fetch/trigger_definition/details`;
    const payload = {
      email: email,
      id: trigger_id,
    };
    const result = await make_api_request(fetch_ifttt_trigger_details_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": process.env.REACT_APP_ZEN_WATCH_DEV_API_KEY,
      },
      body: JSON.stringify(payload),
    });
    return result;
  }

  useEffect(() => {
    const resp = fetch_trigger_definition(email, trigger_info.trigger_id);
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
        setTriggerData(result.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email, trigger_info.trigger_id]);

  // Fetch Action Definition - we allow definining multiple actions (ex, send an email & push notification)
  async function fetch_action_definition(email, action_ids) {
    const fetch_ifttt_action_details_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/fetch/action_definition/details`;
    const payload = {
      email: email,
      ids: action_ids,
    };
    const result = await make_api_request(fetch_ifttt_action_details_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": process.env.REACT_APP_ZEN_WATCH_DEV_API_KEY,
      },
      body: JSON.stringify(payload),
    });
    return result;
  }

  useEffect(() => {
    const action_ids = actions_info.map((_info) => _info.action_id);
    const resp = fetch_action_definition(email, action_ids);
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
        setActionsData(result.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email, actions_info]);

  // Rendering Logic
  const handleToggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h4"><strong>Name:</strong> {ifttt_instance_name}</Typography>
          <Typography variant="h5"><strong>Description:</strong>  {ifttt_instance_description}</Typography>
          <Typography variant="h5">
          <strong>Status:</strong>  {ifttt_instance_is_on ? "On" : "Off"}{" "}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ margin: 2 }} />
      {showDetails && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h3" gutterBottom>
                  Trigger Details
                </Typography>
                <Typography variant="body1">
                  <strong>Trigger Name:</strong> {triggerData.trigger_name}
                </Typography>
                <Typography variant="body1">
                  <strong>Trigger Description:</strong>{" "}
                  {triggerData.trigger_description}
                </Typography>
                <Typography variant="body1">
                  <strong>Target Resource Name:</strong>{" "}
                  {triggerData.target_resource_name}
                </Typography>
                {/* <Typography variant="body1">
                  <strong>Trigger Signature:</strong>{" "}
                  {triggerData.trigger_signature}
                </Typography> */}
                {/* <Typography variant="body1">
                  <strong>Trigger Code:</strong>
                </Typography>
                <Paper sx={{ padding: 2, backgroundColor: "#000" }}>
                  <pre>
                    <code style={{ color: "#fff" }}>
                      {triggerData.trigger_code}
                    </code>
                  </pre>
                </Paper> */}
                <Typography variant="body1">
                  <strong>Trigger Expected Output:</strong>{" "}
                  <Paper sx={{ padding: 2, backgroundColor: "#000" }}>
                    <pre>
                      <code style={{ color: "#fff" }}>
                        {triggerData.trigger_expected_output}
                      </code>
                    </pre>
                  </Paper>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          {actionsData.map((actionData, index) => (
            <Grid container spacing={2} key={`action-${index}`}>
              <Grid item xs={12}>
                <Paper sx={{ padding: 2 }}>
                  <Typography variant="h3" gutterBottom>
                    Action Details
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    If there are multiple actions defined for a trigger, they
                    will be listed below.
                  </Typography>
                  <Typography variant="body1">
                    <strong>Action Name:</strong> {actionData.action_name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Action Description:</strong>{" "}
                    {actionData.action_description}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Target Resource Name:</strong>{" "}
                    {actionData.target_resource_name}
                  </Typography>
                  {/* <Typography variant="body1">
                    <strong>Action Signature:</strong>{" "}
                    {actionData.action_signature}
                  </Typography> */}
                  {/* <Typography variant="body1">
                    <strong>Action Code:</strong>
                  </Typography>
                  <Paper sx={{ padding: 2, backgroundColor: "#000" }}>
                    <pre>
                      <code style={{ color: "#fff" }}>
                        {actionData.action_code}
                      </code>
                    </pre>
                  </Paper> */}
                  <Typography variant="body1">
                    <strong>Action Expected Output:</strong>{" "}
                    <Paper sx={{ padding: 2, backgroundColor: "#000" }}>
                      <pre>
                        <code style={{ color: "#fff" }}>
                          {actionData.action_expected_output}
                        </code>
                      </pre>
                    </Paper>
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          ))}
        </>
      )}
      <Divider sx={{ margin: 2 }} />
      <Typography variant="body2">
        <strong>Created At:</strong> {created_ts}
      </Typography>
      <Typography variant="body2">
        <strong>Last Updated At:</strong> {updated_ts}
      </Typography>
      <Button
        sx={{ marginTop: 2 }}
        variant="contained"
        onClick={handleToggleDetails}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </Button>
      <Button
        sx={{
          marginTop: 2,
          marginLeft: 2,
          backgroundColor: colors.greenAccent[700],
          color: colors.grey[100],
          fontSize: "12px",
          fontWeight: "bold",
          "&:hover": {
            bgcolor: "#1976d2",
          },  
        }}
        variant="contained"
        color="primary"
        onClick={() =>
          handleTurnOffOnSwitchButtonClick(id, !ifttt_instance_is_on)
        }
      >
        {ifttt_instance_is_on ? "Turn Off" : "Turn On"}
      </Button>
    </Paper>
  );
}
