import {
  Box,
  useTheme,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Button,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
//import { useAppDispatch } from "../../app/hooks";
//import { useNavigate } from "react-router-dom";

export default function GasTopbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //const dispatch = useAppDispatch();
  //const navigate = useNavigate();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const availableFieldNames = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const [fieldNames, setFieldnames] = useState([]);

  const handleIntervalChange = () => {};

  const handleFieldsChange = (event) => {
    const {
      target: { value },
    } = event;
    setFieldnames(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const refreshData = async () => {};

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {" "}
      </Box>

      <Box display="flex">
        {/* Select fields */}
        <Box paddingRight="30px">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Fields</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={fieldNames}
              onChange={handleFieldsChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {availableFieldNames.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={fieldNames.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Select Interval */}
        <Box paddingRight="30px">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-simple-select-label">Interval</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={1}
              label="Age"
              onChange={handleIntervalChange}
              MenuProps={MenuProps}
            >
              <MenuItem value={1}>Last 1 day</MenuItem>
              <MenuItem value={7}>Last 7 days</MenuItem>
              <MenuItem value={30}>Last 30 days</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Refresh Icon */}
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              m: 1, 
              height: 53
            }}
            onClick={async () =>{refreshData()} }
          >
            <RefreshIcon sx={{ mr: "10px" }} />
            Refresh
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
