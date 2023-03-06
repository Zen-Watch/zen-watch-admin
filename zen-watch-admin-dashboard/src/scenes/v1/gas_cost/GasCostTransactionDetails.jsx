import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

function prepareDataForGasCostTransactionDetailsView(_json) {
  const output_list = []
  for (let key in _json) {
    output_list.push({
      key: key, 
      value: _json[key]
    })
  }
  return output_list;
}

export default function GasCostTransactionDetails(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { lastSelectedTxnHash, data } = props;
  const _prepared_list = prepareDataForGasCostTransactionDetailsView(data);

  return (
    <Box paddingTop={'20px'}>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          colors={colors.grey[100]}
          p="15px"
        >
          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Transaction Details for {lastSelectedTxnHash}
          </Typography>
        </Box>
        {_prepared_list.map((entry, i) => (
          <Box
            key={`${entry.key}-${i}`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                {entry.key}
              </Typography>

            </Box>
            {/* <Box color={colors.grey[100]}>{transaction.date}</Box> */}
            <Box>
              <Typography
                
                variant="h5"
                fontWeight="500"
              >
                {entry.value}
              </Typography>

            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
