import { Box } from "@mui/material";
import Header from "../../components/Header";

export default function Homepage() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="HOME" subtitle="Visualize your most important metrics" />
      </Box>
    </Box>
  );
}
