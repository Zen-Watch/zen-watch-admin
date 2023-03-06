import { useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import Header from "../../../components/Header";
import { make_api_request } from "../../../util/common_util.methods";
import { useAppSelector } from "../../../app/hooks";
import { STATUS_OK, UNAUTHORIZED_ACCESS } from "../../../util/constants";
import IFTTTTriggerCodeSubmissionHistoryList from "./IFTTTTriggerCodeSubmissionHistoryList";
import IFTTTActionCodeSubmissionHistoryList from "./IFTTTActionCodeSubmissionHistoryList";


export default function IFTTTCodeSubmissions() {
  const email = useAppSelector((state) => state.app.email);
  const [selectedTab, setSelectedTab] = useState(0);
  const [triggerData, setTriggerData] = useState(undefined);
  const [actionData, setActionData] = useState(undefined);
  //const [botData, setBotData] = useState(undefined);

  async function fetch_ifttt_trigger_code_submissions(email: string) {
    const fetch_ifttt_trigger_code_submissions_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/fetch/submissions/trigger_definitions`;
    const payload = { email };
    const result = await make_api_request(fetch_ifttt_trigger_code_submissions_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": process.env.REACT_APP_ZEN_WATCH_DEV_API_KEY,
      },
      body: JSON.stringify(payload),
    });
    return result;
  }

  async function fetch_ifttt_action_code_submissions(email: string) {
    const fetch_ifttt_action_action_code_submission_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/fetch/submissions/action_definitions`;
    const payload = { email };
    const result = await make_api_request(fetch_ifttt_action_action_code_submission_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": process.env.REACT_APP_ZEN_WATCH_DEV_API_KEY,
      },
      body: JSON.stringify(payload),
    });
    return result;
  }

  async function fetch_ifttt_bot_run_history(email: string) {}

  useEffect(() => {
    const resp =
      selectedTab === 0
        ? fetch_ifttt_trigger_code_submissions(email)
        : selectedTab === 1
        ? fetch_ifttt_action_code_submissions(email)
        : fetch_ifttt_bot_run_history(email);

    resp
      .then((result) => {
        if (result.status === UNAUTHORIZED_ACCESS) {
          alert(
            "Unauthorized access, please check your api key or contact support!"
          );
          return;
        } else if (result.status !== STATUS_OK) {
          alert("API Error, please contact support.");
          return;
        }

        if (selectedTab === 0) {
          setTriggerData(result.message);
        } else if (selectedTab === 1) {
          setActionData(result.message);
        } else {
          //setBotData(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email, selectedTab]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        <Header
          title="Your Code Submissions"
          subtitle="View the review status of your trigger & action code submissions"
        />
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{ "& .MuiTab-root": { fontWeight: "bold" } }}
        >
          <Tab label="Triggers" />
          <Tab label="Actions" />
          {/* <Tab label="Bots" /> */}
        </Tabs>
      </Box>
      {selectedTab === 0 && triggerData && (
        <IFTTTTriggerCodeSubmissionHistoryList items={triggerData} />
      )}
      {selectedTab === 1 && actionData && (
        <IFTTTActionCodeSubmissionHistoryList items={actionData} />
      )}
      {/* {selectedTab === 2 && botData && (
        <IFTTTTriggerRunHistoryList items={botData} />
      )} */}
    </Box>
  );
}
