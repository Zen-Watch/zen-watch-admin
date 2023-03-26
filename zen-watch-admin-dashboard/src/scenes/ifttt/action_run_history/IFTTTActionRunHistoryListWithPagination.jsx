import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  useTheme,
  TextField,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { get_ifttt_batch_processing_status } from "../../../util/ifttt/ifttt_util.methods";
import { tokens } from "../../../theme";

export default function IFTTTActionRunHistoryListWithPagination({ items }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setFilteredItems(
      items.filter(
        (_item) =>
          _item.ifttt_instance_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          _item.ifttt_action_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          _item.action_target_resource_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, items]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleIFTTTActionRunHistoryDetailsButtonClick = (_item) => {
    navigate("/view_action_run_history_details", { state: _item });
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const headerStyle = { fontSize: 16 };
  const contentStyle = { fontSize: 14 };

  return (
    <div>
      <Typography variant="h4" color={colors.greenAccent[400]}>
        Your IFTTT Action Run History
      </Typography>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginTop: 4, marginBottom: 4, width: "30%" }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={headerStyle}>IFTTT Recipe Name</TableCell>
            <TableCell style={headerStyle}>Action Name</TableCell>
            <TableCell style={headerStyle}>Resource</TableCell>
            <TableCell style={headerStyle}>Schedule Time</TableCell>
            <TableCell style={headerStyle}>Action Time</TableCell>
            <TableCell style={headerStyle}>Run Status</TableCell>
            <TableCell style={headerStyle}>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((_item) => (
              <TableRow key={_item.id}>
                <TableCell style={contentStyle}>
                  {_item.ifttt_instance_name}
                </TableCell>
                <TableCell style={contentStyle}>
                  {_item.ifttt_action_name}
                </TableCell>
                <TableCell style={contentStyle}>
                  {_item.action_target_resource_name}
                </TableCell>
                <TableCell style={contentStyle}>{_item.created_ts}</TableCell>
                <TableCell style={contentStyle}>{_item.updated_ts}</TableCell>
                <TableCell style={contentStyle}>
                  {get_ifttt_batch_processing_status(_item.action_run_status)}
                </TableCell>
                <TableCell>
                  <Button
                    sx={{
                      backgroundColor: colors.greenAccent[700],
                      color: colors.grey[100],
                      fontSize: "12px",
                      fontWeight: "bold",
                      "&:hover": {
                        bgcolor: "#1976d2",
                      },
                      m: 1,
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleIFTTTActionRunHistoryDetailsButtonClick(_item)
                    }
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredItems.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
