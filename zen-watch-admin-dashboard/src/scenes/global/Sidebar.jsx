import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import ExtensionIcon from '@mui/icons-material/Extension';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreateIcon from '@mui/icons-material/Create';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import EngineeringIcon from '@mui/icons-material/Engineering';
import WorkIcon from '@mui/icons-material/Work';
import PublishIcon from '@mui/icons-material/Publish';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import QueryStatsIcon from '@mui/icons-material/QueryStats';   

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
            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Community
            </Typography> */}
            {/* <Item
              title="Showcase"
              to="/showcase"
              icon={<StorefrontIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Dapp Manuals"
              to="/dapp_manuals"
              icon={<AppShortcutIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Protocol Manuals"
              to="/protocol_manuals"
              icon={<MenuBookIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Recipe Tutorials"
              to="/recipe_tutorials"
              icon={<SchoolIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider /> */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Recipe
            </Typography>
            <Item
              title="Create IFTTT Recipe"
              to="/create_ifttt"
              icon={<CreateIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Your IFTTT Recipes"
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
            <Divider />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Template
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
            {/* <Item
              title="Deploy a Function"
              to="/deploy_cloud_function"
              icon={<PrecisionManufacturingIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Your Functions"
              to="/your_cloud_functions"
              icon={<DynamicFormIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Create New Function"
              to="/create_cloud_function"
              icon={<ExtensionIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Divider />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Utility
            </Typography>
            <Item
              title="AI Console"
              to="/ai_developer_console"
              icon={<SmartToyIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="SQL Editor"
              to="/app_events_sql_editor"
              icon={<QueryStatsIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Divider />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Status
            </Typography>
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
