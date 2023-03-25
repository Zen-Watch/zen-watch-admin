import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function IFTTTRecipeTutorials() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="IFTTT Recipe Tutorials"
          subtitle="Tutorials on how to build your own IFTTT recipes"
        />
      </Box>
    </Box>
  );
}
