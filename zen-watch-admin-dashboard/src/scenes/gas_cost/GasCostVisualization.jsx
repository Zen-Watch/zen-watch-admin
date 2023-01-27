import { Box, useTheme, Typography } from "@mui/material";
import LineChart from "../../components/LineChart";
import { tokens } from "../../theme";

export default function GasCostVisualization() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box padding={"5px"}>
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
          App Profit/Loss Per Transaction in Fiat
        </Typography>
        <Typography
          variant="h3"
          fontWeight="bold"
          color={colors.greenAccent[500]}
        >
          $59,342.32
        </Typography>
      </Box>
      <Box height="50vh" backgroundColor={colors.primary[400]}>
        <LineChart />
      </Box>
    </>
  );
}
