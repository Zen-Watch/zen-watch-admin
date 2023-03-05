import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
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
          
          <Box paddingLeft={isCollapsed ? "undefined" : "10%"}>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Setup IFTTT
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
              Create IFTTT
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
            <Divider />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Setup Bots
            </Typography>
            <Item
              title="Deploy a Bot"
              to="/create_ifttt"
              icon={<PrecisionManufacturingIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Your Bots"
              to="/ifttt_instances"
              icon={<DynamicFormIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Create Bots
            </Typography>
            <Item
              title="Create a Bot"
              to="/create_ifttt"
              icon={<SmartToyIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              App Events
            </Typography>
            <Item
              title="SQL Editor"
              to="/create_ifttt"
              icon={<QueryStatsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Submissions
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