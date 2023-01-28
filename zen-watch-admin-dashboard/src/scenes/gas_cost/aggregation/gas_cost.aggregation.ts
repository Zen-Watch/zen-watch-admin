import { prepareGasCostFiatProfitLossDataForAggregation } from "./gas_cost.fiat_pl_aggregation";

export function prepareGasCostDataForVisualization(data: any) {
  const gas_cost_fiat_profit_loss_data = prepareGasCostFiatProfitLossDataForAggregation(data);
  const result = {
    'gas_cost_fiat_profit_loss_data': gas_cost_fiat_profit_loss_data
  }
  return result;
}
