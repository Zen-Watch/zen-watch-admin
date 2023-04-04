import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { useNavigate } from "react-router-dom";

export default function CreateCodeExternalLinkCallout(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { title, subtitle } = props.data;

  const handleAskGPTLink = () => {
    navigate("/ai_developer_console");
  };

  const handleGithubExternalLink = () => {
    window.open("https://github.com/Zen-Watch/zen-watch-ifttt-starter-kit", "_blank");
  };

  const handleGPTGithubExternalLink = () => {
    window.open("https://github.com/Zen-Watch/zen-watch-ask-gpt-starter-kit", "_blank");
  };

  const handleReplitExternalLink = () => {
    window.open(
      "https://replit.com/@MarcoN4/ZenWatch-IFTTT-Starter-Kit",
      "_blank"
    );
  };

  const handleDiscordLink = () => {
    window.open("https://discord.com/invite/7gMv9ZwgkV", "_blank");
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: colors.blueAccent[900], // "#F0F2F5"
          borderRadius: "10px",
          padding: "16px",
          margin: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "96%",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h3" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5">{subtitle}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "16px" }}>
          <Button variant="contained" onClick={handleGithubExternalLink}>
            FORK ON GITHUB
          </Button>
          <Button variant="contained" onClick={handleReplitExternalLink}>
            FORK ON REPLIT
          </Button>
          <Button variant="contained" onClick={handleDiscordLink}>
            COORDINATE ON DISCORD
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: colors.greenAccent[900],
          borderRadius: "10px",
          padding: "16px",
          margin: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "96%",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Need inspiration for coding?
          </Typography>
          <Typography variant="h5">Use our ChatGPT based AI Code Generator</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "16px" }}>
          <Button variant="contained" onClick={handleAskGPTLink}>
            ASK GPT CONSOLE
          </Button>
          {/* <Button variant="contained" onClick={handleGPTGithubExternalLink}>
            DOWNLOAD ASK GPT TERMINAL FROM GITHUB
          </Button> */}
        </Box>
      </Box>
    </>
  );
}