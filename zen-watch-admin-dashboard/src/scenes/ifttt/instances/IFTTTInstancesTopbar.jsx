import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

export default function IFTTTInstancesTopBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleCreateIFTTTInstance = (event) => {
    navigate("/create_ifttt");
  };
  
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      > </Box>

      {/* ICONS */}
      <Box display="flex">
      <Box>
          <Button
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              m: 1,
              height: 53,
            }}
            onClick={handleCreateIFTTTInstance}
          >
            <AddIcon sx={{ mr: "10px" }} />
              Create an IFTTT Instance
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
