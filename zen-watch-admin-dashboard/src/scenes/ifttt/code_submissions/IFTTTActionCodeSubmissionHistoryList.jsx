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

export default function IFTTTActionCodeSubmissionHistoryList({ items }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  
  const handleIFTTTInstancesActionButtonClick = (_item) => {
    // handle button click here
    navigate("/view_ifttt_instance", { state: _item });
  };

  const headerStyle = { fontSize: 16 };
  const contentStyle = { fontSize: 14 };

  return (
    <div>
      <Typography variant="h4" color={colors.greenAccent[400]}>
        Your IFTTT Action Code Submissions
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={headerStyle}>Action Name</TableCell>
            <TableCell style={headerStyle}>Action Description</TableCell>
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
              <TableCell style={contentStyle}>{_item.action_name}</TableCell>
              <TableCell style={contentStyle}> {_item.action_description} </TableCell>
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
