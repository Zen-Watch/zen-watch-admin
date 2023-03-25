import { Box } from "@mui/material";
import Header from "../../../components/Header";

export default function CommunityStoreFront() {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Community Storefront"
          subtitle="Free store front to connect with builders from the community to build your custom IFTTT recipes"
        />
      </Box>
    </Box>
  );
}
