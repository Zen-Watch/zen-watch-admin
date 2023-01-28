import { Box, useTheme, Typography } from "@mui/material";
import LineChart from "../../components/LineChart";
import { tokens } from "../../theme";

export default function GasCostAppProfitLossFiatVisualization(props) {
  const { data } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log('DATA called 1', data)
  return (
    <>
      <Box padding={"5px"}>
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
          Total Profit/Loss in Fiat
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
        <LineChart data={data}/>
      </Box>
    </>
  );
}
