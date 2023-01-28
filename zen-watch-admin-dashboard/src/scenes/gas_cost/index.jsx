import { Box } from "@mui/material";
import Header from "../../components/Header";
import GasCostTopbar from "./GasCostTopbar";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  get_supported_chains,
  make_api_request,
  get_default_exchange_currency,
} from "../../util/util.methods";
import { STATUS_OK } from "../../util/constants";
import GasCostAppProfitLossFiatVisualization from "./GasCostAppProfitLossFiatVisualization";
import { prepareGasCostDataForVisualization } from "./aggregation/gas_cost.aggregation";

export default function GasCost() {
  const supportedChains = get_supported_chains();
  const defaultExchangeCurrency = get_default_exchange_currency();

  const email = useAppSelector((state) => state.app.email);

  const [selectedChains, setSelectedChains] = useState(supportedChains);
  const [lookBackPeriod, setLookBackPeriod] = useState(1);
  const [exchangeCurrency, setExchangeCurrency] = useState(defaultExchangeCurrency);
  const [chartData, setChartData] = useState(undefined);

  const [lastSelectedTxnHash, setLastSelectedTxnHash] = useState("");

  const handleRefreshData = async () => {
    try {
      const fetch_evm_transaction_insights = `${process.env.REACT_APP_ADMIN_BASE_URL}/admin/fetch/evm_transactions/gas_cost/insights`;
      const payload = {
        api_key: process.env.REACT_APP_ZEN_WATCH_DEV_API_KEY,
        email: email,
        chains: selectedChains,
        lookback_period: lookBackPeriod,
        exchange_currency: exchangeCurrency,
      };
      const result = await make_api_request(fetch_evm_transaction_insights, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });
      if (result.status !== STATUS_OK) {
        alert("API Error, please contact support.");
        return;
      }
      const chart_data = prepareGasCostDataForVisualization(result.message);
      setChartData(chart_data);
    } catch (error) {
      alert("API Error, please contact support.");
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
        exchangeCurrency={exchangeCurrency}
        setExchangeCurrency={setExchangeCurrency}
        handleRefreshData={async () => {
          handleRefreshData();
        }}
      />
      {chartData && (
        <GasCostAppProfitLossFiatVisualization
          data={chartData.gas_cost_fiat_profit_loss_data}
          lastSelectedTxnHash={lastSelectedTxnHash}
          setLastSelectedTxnHash={setLastSelectedTxnHash}
        />
      )}
      {/* { lastSelectedTxnHash && <div>Last Selected Txn Hash: {lastSelectedTxnHash} </div> }  */}
    </Box>
  );
}
