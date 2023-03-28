import { Box } from "@mui/material";
import Header from "../../../components/Header";
import ChatGPTCodeGenerator from "./ChatGPTCodeGenerator";

export default function AIDeveloperConsole() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="AI Powered Developer Console"
          subtitle="AI Powered Chatbot Code Generator to build custom triggers, actions and functions for your IFTTT recipes"
        />
      </Box>
      <ChatGPTCodeGenerator />
    </Box>
  );
}
