import React from "react";
import { tokens } from "../../../theme";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  useTheme,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function IFTTTTriggerCodeSubmissionHistoryList({ items }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  
  const handleIFTTTInstancesActionButtonClick = (_item) => {
    // handle button click here
    navigate("/view_submitted_trigger_details", { state: _item });
  };

  const headerStyle = { fontSize: 16 };
  const contentStyle = { fontSize: 14 };

  return (
    <div>
      <Typography variant="h4" color={colors.greenAccent[400]}>
        Your IFTTT Trigger Code Submissions
      </Typography>
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
          {items.map((_item) => (
            <TableRow key={_item.id}>
              <TableCell style={contentStyle}>{_item.trigger_name}</TableCell>
              <TableCell style={contentStyle}> {_item.trigger_description} </TableCell>
              <TableCell style={contentStyle}> {_item.target_resource_name} </TableCell>
              <TableCell style={contentStyle}> {_item.is_public ? "Public" : "Private"} </TableCell>
              <TableCell style={contentStyle}> {_item.is_approved ? "Approved" : "Pending"} </TableCell>
              <TableCell style={contentStyle}> {_item.created_ts } </TableCell>
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
    </div>
  );
}
