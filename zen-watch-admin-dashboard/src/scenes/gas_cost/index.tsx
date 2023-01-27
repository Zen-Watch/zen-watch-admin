import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GasCostTopbar from "./GasCostTopbar";

export default function GasCost() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="GAS COST" subtitle="Visualize your on-chain gas cost & profitability" />
      </Box>
      <GasCostTopbar />
      <Box height="50vh">
        <LineChart />
      </Box>
    </Box>
  );
}