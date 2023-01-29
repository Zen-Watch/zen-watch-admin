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
import { prepareGasCostDataForDataGridView } from "./aggregation/gas_cost.aggregation";
import GasCostDataGrid from "./GasCostDataGrid";

export default function GasCostTableView() {
  const supportedChains = get_supported_chains();
  const defaultExchangeCurrency = get_default_exchange_currency();

  const email = useAppSelector((state) => state.app.email);

  const [selectedChains, setSelectedChains] = useState(supportedChains);
  const [lookBackPeriod, setLookBackPeriod] = useState(1);
  const [exchangeCurrency, setExchangeCurrency] = useState(
    defaultExchangeCurrency
  );
  const [tableData, setTableData] = useState(undefined);

  const handleRefreshData = async () => {
    try {
      const result = await fetchEVMTransactionsGasCostInsights(email, selectedChains, lookBackPeriod, exchangeCurrency);
      if (result.status !== STATUS_OK) {
        alert("API Error, please contact support.");
        return;
      }
      const table_data = prepareGasCostDataForDataGridView(result.message);
      setTableData(table_data);
    } catch (error) {
      console.log(error)
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
      {tableData && (
        <GasCostDataGrid data={tableData.gas_cost_fiat_profit_loss_data}/>
      )}
    </Box>
  );
}
