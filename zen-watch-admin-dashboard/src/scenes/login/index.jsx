import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { tokens } from "../../theme";

export default function Login()  {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontSize="64px" color={colors.grey[100]}>
          Zen.Watch
        </Typography>
        <Typography variant="h3" color={colors.greenAccent[400]}>
        Web3 IFTTT Automation For Developers 
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
      >
        <Form />
      </Box>
    </Box>
  );
};
