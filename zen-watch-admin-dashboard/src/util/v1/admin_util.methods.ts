import { make_api_request } from "../common_util.methods";

export async function fetchEVMTransactionsGasCostInsights(email: string, selectedChains: string[], lookBackPeriod: number, exchangeCurrency: string) {
  const fetch_evm_transaction_gas_cost_insights = `${process.env.REACT_APP_ADMIN_BASE_URL}/admin/fetch/evm_transactions/gas_cost/insights`;
      const payload = {
        email: email,
        chains: selectedChains,
        lookback_period: lookBackPeriod,
        exchange_currency: exchangeCurrency,
      };
      const result = await make_api_request(fetch_evm_transaction_gas_cost_insights, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "x-api-key": process.env.REACT_APP_ZEN_WATCH_DEV_API_KEY,
        },
        body: JSON.stringify(payload),
      });
      return result;
}

export function get_supported_chains() {
  return ["polygon_mainnet", "ethereum_mainnet"];
}


export function get_default_exchange_currency() {
  return "USD";
}