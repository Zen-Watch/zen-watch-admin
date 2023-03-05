import React from "react";
import { tokens } from "../../../theme";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  Typography
} from "@mui/material";

import {get_ifttt_batch_processing_status} from '../../../util/ifttt/ifttt_util.methods';

export default function IFTTTTriggerRunHistoryList({ items }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const headerStyle = { fontSize: 16 };
  const contentStyle = { fontSize: 14 };

  console.log("IFTTTTriggerRunHistoryList.items: ", items)

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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
