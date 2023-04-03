// ChatGPTCodeGenerator.js
import { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { make_api_request } from "../../../util/common_util.methods";
import { STATUS_OK, UNAUTHORIZED_ACCESS } from "../../../util/constants";

export default function ChatGPTCodeGenerator() {
  const email = useAppSelector((state) => state.app.email);
  const [promptText, setPromptText] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [progress, setProgress] = useState(0);

  const handlePromptChange = (event) => {
    setPromptText(event.target.value);
  };

  async function ask_gpt(email) {
    const ask_gpt_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/ask/gpt`;
    const payload = {
      email: email,
      prompt: promptText,
    };
    const result = await make_api_request(ask_gpt_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": process.env.REACT_APP_ZEN_WATCH_DEV_API_KEY,
      },
      body: JSON.stringify(payload),
    });
    return result;
  }

  const handleAskGPT = async () => {
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 2
      );
    }, 500);

    try {
      const response = await ask_gpt(email);
      console.log(response);
      clearInterval(progressInterval);
      setProgress(0);

      if (response.status === STATUS_OK) {
        setGeneratedCode(response.message);
      } else if (response.status === UNAUTHORIZED_ACCESS) {
        alert(
          "Unauthorized access, please check your api key or contact support!"
        );
        return;
      } else {
        alert("API Error, please contact support.");
        return;
      }
    } catch (error) {
      alert("Unknown Error, possibly Network Error, please contact support.");
      return;
    }
  };

  const handleClear = () => {
    setPromptText("");
    setGeneratedCode("");
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
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
            <TextField
              id="prompt-text"
              label="Prompt Text"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
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
            <Button
              variant="contained"
              onClick={handleAskGPT}
              sx={{ marginRight: 1 }}
            >
              Ask GPT
            </Button>
            <Button variant="outlined" onClick={handleClear}>
              Clear
            </Button>
          </Box>

          {progress > 0 && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body1">
                ChatGPT is generating the result...{" "}
                <span
                  role="img"
                  aria-label="hourglass"
                  style={{
                    animation: "spin 2s linear infinite",
                    display: "inline-block",
                  }}
                >
                  ⏳
                </span>
              </Typography>
              <pre>[{"".padStart(progress / 2, "=").padEnd(10, " ")}]</pre>
            </Box>
          )}

          <Box
            sx={{
              marginBottom: 2,
              marginTop: 4,
              border: "1px solid black",
              overflow: "auto",
              maxHeight: "500px",
              maxWidth: "100%",
              backgroundColor: "black",
            }}
          >
            <pre
              style={{ backgroundColor: "black", color: "white", margin: 10 }}
            >
              {generatedCode}
            </pre>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
