import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from 'firebase/auth'
import { auth } from "../../firebase-config";
import { useAppDispatch } from '../../app/hooks';
import { disconnect } from '../../features/appSlice';
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    dispatch(disconnect());
    navigate("/");
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
