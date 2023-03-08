import React from "react";
import { tokens } from "../../../theme";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {get_ifttt_batch_processing_status} from '../../../util/ifttt/ifttt_util.methods';

export default function IFTTTTriggerRunHistoryList({ items }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  
  const headerStyle = { fontSize: 16 };
  const contentStyle = { fontSize: 14 };

  const handleIFTTTTriggerRunHistoryDetailsButtonClick = (_item) => {
    // handle button click here
    navigate("/view_trigger_run_history_details", { state: _item });
  };

  return (
    <div>
      <Typography variant="h4" color={colors.greenAccent[400]}>
        Your IFTTT Trigger Run History
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={headerStyle}>IFTTT Instance Name</TableCell>
            <TableCell style={headerStyle}>Trigger Name</TableCell>
            <TableCell style={headerStyle}>Resource</TableCell>
            <TableCell style={headerStyle}>Schedule Time</TableCell>
            <TableCell style={headerStyle}>Trigger Time</TableCell>
            <TableCell style={headerStyle}>Run Status</TableCell>
            <TableCell style={headerStyle}>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((_item) => (
            <TableRow key={_item.id}>
              <TableCell style={contentStyle}>{_item.ifttt_instance_name}</TableCell>
              <TableCell style={contentStyle}> {_item.ifttt_trigger_name} </TableCell>
              <TableCell style={contentStyle}> {_item.trigger_target_resource_name} </TableCell>
              <TableCell style={contentStyle}> {_item.created_ts} </TableCell>
              <TableCell style={contentStyle}> {_item.updated_ts} </TableCell>
              <TableCell style={contentStyle}> {get_ifttt_batch_processing_status(_item.trigger_run_status)} </TableCell>
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
                  onClick={() => handleIFTTTTriggerRunHistoryDetailsButtonClick(_item)}
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
