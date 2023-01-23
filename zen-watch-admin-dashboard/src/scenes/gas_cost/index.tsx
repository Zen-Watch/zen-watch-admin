import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

export default function Gascost() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="GAS COST" subtitle="Visualize your gas costs" />
      </Box>
      <Box height="50vh">
        <LineChart />
      </Box>
    </Box>
  );
}