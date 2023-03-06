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

export default function IFTTTInstancesList({ items }) {
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
        Your IFTTT Instances
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={headerStyle}>Name</TableCell>
            <TableCell style={headerStyle}>Description</TableCell>
            <TableCell style={headerStyle}>Resource</TableCell>
            <TableCell style={headerStyle}>Status</TableCell>
            <TableCell style={headerStyle}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((_item) => (
            <TableRow key={_item.id}>
              <TableCell style={contentStyle}>{_item.ifttt_instance_name}</TableCell>
              <TableCell style={contentStyle}> {_item.ifttt_instance_description} </TableCell>
              <TableCell style={contentStyle}> {_item.trigger_target_resource_name} </TableCell>
              <TableCell style={contentStyle}> {_item.ifttt_instance_is_on ? "On" : "Off"} </TableCell>
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
                  {_item.ifttt_instance_is_on ? "Details / Turn Off" : "Details / Turn On"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
