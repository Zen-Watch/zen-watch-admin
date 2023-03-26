import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  useTheme,
  Typography,
  TextField,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";

export default function IFTTTTriggerCodeSubmissionHistoryListWithPagination({ items }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setFilteredItems(
      items.filter((_item) =>
        _item.trigger_name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleIFTTTInstancesActionButtonClick = (_item) => {
    navigate("/view_submitted_trigger_details", { state: _item });
  };

  const headerStyle = { fontSize: 16 };
  const contentStyle = { fontSize: 14 };

  return (
    <div>
      <Typography variant="h4" color={colors.greenAccent[400]}>
        Your IFTTT Trigger Code Submissions
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
            <TableCell style={headerStyle}>Trigger Name</TableCell>
            <TableCell style={headerStyle}>Trigger Description</TableCell>
            <TableCell style={headerStyle}>Resource</TableCell>
            <TableCell style={headerStyle}>Availability</TableCell>
            <TableCell style={headerStyle}>Approval Status</TableCell>
            <TableCell style={headerStyle}>Created Time</TableCell>
            <TableCell style={headerStyle}>Profile View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((_item) => (
              <TableRow key={_item.id}>
                <TableCell style={contentStyle}>{_item.trigger_name}</TableCell>
                <TableCell style={contentStyle}>
                  {_item.trigger_description}
                </TableCell>
                <TableCell style={contentStyle}>
                  {_item.target_resource_name}
                </TableCell>
                <TableCell style={contentStyle}>
                  {_item.is_public ? "Public" : "Private"}
                </TableCell>
                <TableCell style={contentStyle}>
                  {_item.is_approved ? "Approved" : "Pending"}
                </TableCell>
                <TableCell style={contentStyle}>{_item.created_ts}</TableCell>
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
                    onClick={() => handleIFTTTInstancesActionButtonClick(_item)}
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
