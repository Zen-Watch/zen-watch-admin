import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CreateIcon from '@mui/icons-material/Create';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import EngineeringIcon from '@mui/icons-material/Engineering';
import WorkIcon from '@mui/icons-material/Work';
import PublishIcon from '@mui/icons-material/Publish';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography sx={{ fontSize: "16px" }}>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

export default function Sidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Zen.Watch
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? "undefined" : "10%"}>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Use Existing Code
            </Typography>
            <Item
              title="Create An Instance"
              to="/create_ifttt"
              icon={<CreateIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Your Instances"
              to="/ifttt_instances"
              icon={<ToggleOnIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Trigger Run History"
              to="/trigger_run_history"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Action Run History"
              to="/action_run_history"
              icon={<WorkHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Develop Code
            </Typography>
            <Item
              title="Create New Trigger"
              to="/create_new_trigger"
              icon={<EngineeringIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create New Action"
              to="/create_new_action"
              icon={<WorkIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Your Submissions"
              to="/code_submissions"
              icon={<PublishIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              On-chain
            </Typography>
            <Item
              title="Gas Cost"
              to="/gas_cost"
              icon={<EvStationOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Transaction Errors"
              to="/transaction_errors"
              icon={<ErrorOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              In-App
            </Typography>
            <Item
              title="Events"
              to="/transactions"
              icon={<AppShortcutIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
