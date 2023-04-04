import { Box } from "@mui/material";
import Header from "../../../components/Header";
import ChatGPTCodeGenerator from "./ChatGPTCodeGenerator";

export default function AIDeveloperConsole() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Ask GPT Console"
          subtitle="Open AI's Chat GPT powered code generator to build custom triggers, actions and functions for your IFTTT recipes"
        />
      </Box>
      <ChatGPTCodeGenerator />
    </Box>
  );
}
