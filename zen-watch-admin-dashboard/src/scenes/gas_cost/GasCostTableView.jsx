import { Box } from "@mui/material";
import Header from "../../components/Header";
import GasCostTopbar from "./GasCostTopbar";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  get_supported_chains,
  fetchEVMTransactionsGasCostInsights,
  get_default_exchange_currency,
} from "../../util/util.methods";
import { GAS_COST_GRAPH_VIEW, STATUS_OK } from "../../util/constants";
import GasCostAppProfitLossFiatVisualization from "./GasCostAppProfitLossFiatVisualization";
import { prepareGasCostDataForVisualization } from "./aggregation/gas_cost.aggregation";
import GasCostTransactionDetails from "./GasCostTransactionDetails";

export default function GasCostTableView() {
  const supportedChains = get_supported_chains();
  const defaultExchangeCurrency = get_default_exchange_currency();

  const email = useAppSelector((state) => state.app.email);

  const [selectedChains, setSelectedChains] = useState(supportedChains);
  const [lookBackPeriod, setLookBackPeriod] = useState(1);
  const [exchangeCurrency, setExchangeCurrency] = useState(
    defaultExchangeCurrency
  );
  const [chartData, setChartData] = useState(undefined);

  const [lastSelectedTxnHash, setLastSelectedTxnHash] = useState("");

  const handleRefreshData = async () => {
    try {
      const result = await fetchEVMTransactionsGasCostInsights(email, selectedChains, lookBackPeriod, exchangeCurrency);
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
          title="GAS COST - TABLE VIEW"
          subtitle="Visualize your on-chain gas cost & profitability as a table"
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
        flipTo={GAS_COST_GRAPH_VIEW}
      />
      {chartData && (
        <GasCostAppProfitLossFiatVisualization
          data={chartData.gas_cost_fiat_profit_loss_data}
          lastSelectedTxnHash={lastSelectedTxnHash}
          setLastSelectedTxnHash={setLastSelectedTxnHash}
        />
      )}
      {lastSelectedTxnHash && (
        <GasCostTransactionDetails
          lastSelectedTxnHash={lastSelectedTxnHash}
          data={chartData.gas_cost_fiat_profit_loss_data.gas_cost_inverted_index[lastSelectedTxnHash]}
        />
      )}
    </Box>
  );
}
