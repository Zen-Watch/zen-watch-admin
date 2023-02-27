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
import { tokens } from "../../../theme";
import { useNavigate } from "react-router-dom";
import FlipIcon from '@mui/icons-material/Flip';
import RefreshIcon from "@mui/icons-material/Refresh";
import { GAS_COST_GRAPH_VIEW } from "../../../util/constants";
//import { useAppDispatch } from "../../app/hooks";
//import { useNavigate } from "react-router-dom";

export default function GasCostTopbar(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  //const dispatch = useAppDispatch();
  

  const {
    selectedChains,
    lookBackPeriod,
    setSelectedChains,
    setLookBackPeriod,
    supportedChains,
    handleRefreshData,
    exchangeCurrency,
    setExchangeCurrency,
    flipTo
  } = props;

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

  const handleFlipView = (event) => {
    if (flipTo === GAS_COST_GRAPH_VIEW) navigate("/gas_cost");
    else navigate("/gas_cost_tableview");
  };

  const handleLookbackChange = (event) => {
    const {
      target: { value },
    } = event;
    setLookBackPeriod(value);
  };

  const handleExchangeCurrencyChange = (event) => {
    const {
      target: { value },
    } = event;
    setExchangeCurrency(value);
  };

  const handleChainsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedChains(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };  

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
        
        {/* Select chains */}
        <Box paddingRight="30px">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Chains</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedChains}
              onChange={handleChainsChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {supportedChains.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedChains.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Select Currency */}
        <Box paddingRight="30px">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-simple-select-label">Exchange Currrency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={exchangeCurrency}
              label="Exchange_Currrency"
              onChange={handleExchangeCurrencyChange}
              MenuProps={MenuProps}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'}>INR</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Select Interval */}
        <Box paddingRight="30px">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-simple-select-label">Lookback</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lookBackPeriod}
              label="Lookback"
              onChange={handleLookbackChange}
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
              height: 53,
            }}
            onClick={async () => {
              handleRefreshData();
            }}
          >
            <RefreshIcon sx={{ mr: "10px" }} />
            Refresh
          </Button>
        </Box>

        {/* Flip View Icon */}
        <Box>
          <Button
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              m: 1,
              height: 53,
            }}
            onClick={handleFlipView}
          >
            <FlipIcon sx={{ mr: "10px" }} />
              {flipTo}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
