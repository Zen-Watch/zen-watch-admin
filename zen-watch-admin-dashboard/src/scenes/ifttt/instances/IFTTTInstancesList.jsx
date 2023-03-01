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
  
  const handleIFTTTInstancesActionButtonClick = (id) => {
    console.log(`Button clicked for item with id ${id}`);
    // handle button click here
    navigate("/view_ifttt_instance");
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
            <TableCell style={headerStyle}>Type</TableCell>
            <TableCell style={headerStyle}>Status</TableCell>
            <TableCell style={headerStyle}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(({ id, ifttt_instance_name, ifttt_instance_description, trigger_target_resource_name, ifttt_instance_is_on }) => (
            <TableRow key={id}>
              <TableCell style={contentStyle}>{ifttt_instance_name}</TableCell>
              <TableCell style={contentStyle}> {ifttt_instance_description} </TableCell>
              <TableCell style={contentStyle}> {trigger_target_resource_name} </TableCell>
              <TableCell style={contentStyle}> {ifttt_instance_is_on ? "On" : "Off"} </TableCell>
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
                  onClick={() => handleIFTTTInstancesActionButtonClick(id)}
                >
                  {ifttt_instance_is_on ? "View Details / Turn Off" : "View Details / Turn On"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
