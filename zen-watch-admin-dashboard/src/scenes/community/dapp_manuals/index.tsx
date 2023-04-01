import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function DappManuals() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Dapp Manuals"
          subtitle="Quick introduction to the web3 dapp developer documentation and how to use them"
        />
      </Box>
    </Box>
  );
}
