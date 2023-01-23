import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      > </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
