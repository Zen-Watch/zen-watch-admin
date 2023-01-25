import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import TransactionsTopbar from "./TransactionsTopbar";

export default function Transactions() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TRANSACTIONS" subtitle="Visualize your on-chain transactions, gas costs, errors" />
      </Box>
      <TransactionsTopbar />
      <Box height="50vh">
        <LineChart />
      </Box>
    </Box>
  );
}