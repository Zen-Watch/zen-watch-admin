import { Box, Button, Typography } from "@mui/material";

export default function CreateCodeExternalLinkCallout(props) {
  const { title, subtitle } = props.data;

  const handleExternalLink = () => {
    window.open(
      "https://replit.com/@MarcoN4/ZenWatch-IFTTT-Starter-Kit",
      "_blank"
    );
  };

  const handleDiscordLink = () => {
    window.open("https://discord.com/invite/7gMv9ZwgkV", "_blank");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F0F2F5",
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
        <Button variant="contained" onClick={handleExternalLink}>
          FORK REPLIT DEVELOPER STARTER KIT
        </Button>
        <Button variant="contained" onClick={handleDiscordLink}>
          COORDINATE ON DISCORD
        </Button>
      </Box>
    </Box>
  );
}
