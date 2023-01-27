import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

export default function NoMatch() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Typography variant="h1" color={colors.grey[100]}>
         404 - Page Not Found
      </Typography>
    </Box>
  );
}
