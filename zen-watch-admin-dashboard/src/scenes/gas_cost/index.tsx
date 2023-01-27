import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GasCostTopbar from "./GasCostTopbar";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  get_supported_chains,
  make_api_request,
} from "../../util/util.methods";
import { STATUS_OK } from "../../util/constants";

export default function GasCost() {
  const supportedChains = get_supported_chains();

  const email = useAppSelector((state) => state.app.email);

  const [selectedChains, setSelectedChains] = useState(supportedChains);
  const [lookBackPeriod, setLookBackPeriod] = useState(1);

  const handleRefreshData = async () => {
    try {
      const fetch_evm_transaction_insights = `${process.env.REACT_APP_ADMIN_BASE_URL}/admin/fetch/evm_transactions/insights`;
      const payload = {
        api_key: process.env.REACT_APP_ZEN_WATCH_DEV_API_KEY,
        email: email,
        chains: selectedChains,
        lookback_period: lookBackPeriod,
      };
      const result = await make_api_request(fetch_evm_transaction_insights, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });
      console.log(result)
      if (result.status !== STATUS_OK) {
        alert('API Error, please contact support.');
        return;
      }
      

    } catch (error) {
      alert('API Error, please contact support.')
    }
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="GAS COST"
          subtitle="Visualize your on-chain gas cost & profitability"
        />
      </Box>
      <GasCostTopbar
        selectedChains={selectedChains}
        lookBackPeriod={lookBackPeriod}
        setSelectedChains={setSelectedChains}
        setLookBackPeriod={setLookBackPeriod}
        supportedChains={supportedChains}
        handleRefreshData={async () => {
          handleRefreshData();
        }}
      />
      <Box height="50vh">
        <LineChart />
      </Box>
    </Box>
  );
}
