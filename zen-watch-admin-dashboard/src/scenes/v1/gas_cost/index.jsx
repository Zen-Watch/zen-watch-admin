import { Box } from "@mui/material";
import Header from "../../../components/Header";
import GasCostTopbar from "./GasCostTopbar";
import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import {
  get_supported_chains,
  fetchEVMTransactionsGasCostInsights,
  get_default_exchange_currency,
} from "../../../util/v1/admin_util.methods";
import { GAS_COST_TABLE_VIEW, STATUS_OK, UNAUTHORIZED_ACCESS } from "../../../util/constants";
import GasCostAppProfitLossFiatVisualization from "./GasCostAppProfitLossFiatVisualization";
import { prepareGasCostDataForVisualization } from "./aggregation/gas_cost.aggregation";
import GasCostTransactionDetails from "./GasCostTransactionDetails";

export default function GasCost() {
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
      if (result.status === UNAUTHORIZED_ACCESS) {
        alert(
          "Unauthorized access, please check your api key or contact support!"
        );
        return;
      }
      else if (result.status !== STATUS_OK) {
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
        flipTo={GAS_COST_TABLE_VIEW}
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
