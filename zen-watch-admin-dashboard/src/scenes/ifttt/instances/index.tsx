import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "../../../components/Header";
import IFTTTInstancesTopBar from "./IFTTTInstancesTopbar";
import { make_api_request } from "../../../util/common_util.methods";
import { useAppSelector } from "../../../app/hooks";
import { STATUS_OK, UNAUTHORIZED_ACCESS } from "../../../util/constants";
import IFTTTInstancesListWithPagination from "./IFTTTInstancesListWithPagination";

export default function IFTTTInstances() {
  const email = useAppSelector((state) => state.app.email);
  const [data, setData] = useState(undefined);

  async function fetch_ifttt_instances(email: string) {
    const fetch_ifttt_instances_url = `${process.env.REACT_APP_ADMIN_BASE_URL}/ifttt/fetch/ifttt_instances`;
    const payload = { email };
    const result = await make_api_request(fetch_ifttt_instances_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": process.env.REACT_APP_ZEN_WATCH_DEV_API_KEY,
      },
      body: JSON.stringify(payload),
    });
    return result;
  }

  useEffect(() => {
    const resp = fetch_ifttt_instances(email);
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
        setData(result.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Your IFTTT Recipes"
          subtitle="Create and manage your IFTTT recipes"
        />
      </Box>
      <IFTTTInstancesTopBar />
      {data && <IFTTTInstancesListWithPagination items={data} />}
    </Box>
  );
}
