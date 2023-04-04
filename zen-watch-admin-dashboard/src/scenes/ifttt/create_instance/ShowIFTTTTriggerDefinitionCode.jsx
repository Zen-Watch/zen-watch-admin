import { useState, useEffect } from "react";

import { Box, Typography, Button } from "@mui/material";
import { FileCopy } from "@mui/icons-material";
import { useAppSelector } from "../../../app/hooks";
import { make_api_request } from "../../../util/common_util.methods";
import { STATUS_OK, UNAUTHORIZED_ACCESS } from "../../../util/constants";

export default function ShowIFTTTTriggerDefinitionCode({
  selectedTriggerDefinition,
  showCode,
}) {
  const [triggerCodeDetails, setTriggerCodeDetails] = useState(null);
  const email = useAppSelector((state) => state.app.email);
  const [copySuccess, setCopySuccess] = useState("");

  function copyToClipboard(textToCopy) {
    navigator.clipboard.writeText(textToCopy);
    setCopySuccess("Copied to clipboard!");
  }

  async function fetch_trigger_definition_code(email, trigger_id) {
    const fetch_ifttt_public_approved_trigger_definition_code = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/fetch/public/approved/trigger_definition/code`;
    const payload = {
      email,
      trigger_id,
    };
    const result = await make_api_request(
      fetch_ifttt_public_approved_trigger_definition_code,
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
    console.log("selectedTriggerDefinition", selectedTriggerDefinition.id);
    console.log("showCode", showCode);
    if (showCode) {
      const resp = fetch_trigger_definition_code(
        email,
        selectedTriggerDefinition.id
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
          setTriggerCodeDetails(result.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [email, selectedTriggerDefinition, showCode]);

  return (
    <Box>
      {triggerCodeDetails && (
        <>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="subtitle2">
              <strong>Signature:</strong>
            </Typography>
            <Typography variant="body1">
              {triggerCodeDetails.trigger_signature}
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="subtitle2">
              <strong>Signature Description:</strong>
            </Typography>
            <Typography variant="body1">
              {triggerCodeDetails.trigger_signature_description}
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="subtitle2">
              {" "}
              <strong>Code:</strong>{" "}
              <Button
                onClick={() => copyToClipboard(triggerCodeDetails.trigger_code)}
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
                <code>{triggerCodeDetails.trigger_code}</code>
              </pre>
            </Box>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="subtitle2">
              <strong>Code Description:</strong>
            </Typography>
            <Typography variant="body1">
              {triggerCodeDetails.trigger_code_description}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
