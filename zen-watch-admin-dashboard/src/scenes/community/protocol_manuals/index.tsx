import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function ProtocolManuals() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Protocol Manuals"
          subtitle="Quick introduction to the web3 protocols and how to use them"
        />
      </Box>
    </Box>
  );
}
