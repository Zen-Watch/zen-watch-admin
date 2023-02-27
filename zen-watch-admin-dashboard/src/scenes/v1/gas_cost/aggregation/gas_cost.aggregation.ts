import { prepareGasCostFiatProfitLossDataForAggregation } from "./gas_cost.fiat_pl_aggregation";
import { prepareGasCostFiatProfitLossDataForTableView } from "./gas_cost.table_view";

export function prepareGasCostDataForVisualization(data: any) {
  const gas_cost_fiat_profit_loss_data = prepareGasCostFiatProfitLossDataForAggregation(data);
  const result = {
    'gas_cost_fiat_profit_loss_data': gas_cost_fiat_profit_loss_data
  }
  return result;
}

export function prepareGasCostDataForDataGridView(data: any) {
  const gas_cost_fiat_profit_loss_data = prepareGasCostFiatProfitLossDataForTableView(data);
  const result = {
    'gas_cost_fiat_profit_loss_data': gas_cost_fiat_profit_loss_data
  }
  return result;
}
