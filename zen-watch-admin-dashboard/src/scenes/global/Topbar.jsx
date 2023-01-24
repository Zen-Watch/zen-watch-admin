import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth'
import { auth } from "../../firebase-config";

export default function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const logout = async () => {
    await signOut(auth);
  }
  
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      > </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={async () =>{logout()} }>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
