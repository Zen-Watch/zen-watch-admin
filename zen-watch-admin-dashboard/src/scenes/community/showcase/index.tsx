import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function CommunityShowcase() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Community Showcase"
          subtitle="See what other builders are building, work with other builders to build your custom IFTTT recipes"
        />
      </Box>
    </Box>
  );
}
