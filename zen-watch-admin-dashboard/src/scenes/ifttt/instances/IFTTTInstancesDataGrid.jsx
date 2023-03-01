import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
//import { mockDataContacts } from "../../data/mockData";
import { useTheme } from "@mui/material";

export default function IFTTTInstancesDataGrid (props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data } = props;
  const { column_data, table_data, initial_state } = data;

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          initialState={initial_state}
          rows={table_data}
          columns={column_data}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{ toolbar: { printOptions: { disableToolbarButton: true } } }}
        />
      </Box>
    </Box>
  );
};
