import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function TransactionErrors() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TRANSACTION ERRORS" subtitle="Visualize your failed transactions" />
      </Box>
    </Box>
  );
}
