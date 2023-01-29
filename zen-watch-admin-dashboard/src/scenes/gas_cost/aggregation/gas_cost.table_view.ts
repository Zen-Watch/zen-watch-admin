import { IHash } from "../../../util/constants";

export function prepareGasCostFiatProfitLossDataForTableView(data: any) {
  const app_gas_cost_graph_data: IHash = {};

  // Combine success/error txns for this view
  const combined_txn_metrics = [
    ...data.successful_txn_metrics,
    ...data.error_txn_metrics,
  ];

  const column_data = [];

  const column_visibility_model: IHash = {};

  const initial_state = {
    columns: {
      columnVisibilityModel: column_visibility_model,
    },
  };

  // unique id for data grid
  column_data.push({
    field: "id",
    headerName: "id",
    flex: 0.5,
    hide: true,
  });

  const INITIAL_COLUMNS = [
    "event_type",
    "wallet_address",
    "txn_hash",
    "exchange_rate",
    "exchange_currency",
    "final_txn_fee_fiat",
    "app_charge_incl_txn_cost_fiat",
    "app_charge_excl_txn_cost_fiat",
    "app_total_profit_loss_fiat",
    "app_txn_tag",
    "created_ts",
  ];

  for (let key in combined_txn_metrics[0]) {
    if (INITIAL_COLUMNS.includes(key)) column_visibility_model[key] = true;
    else column_visibility_model[key] = false;

    column_data.push({
      field: key,
      headerName: key,
      flex: 1,
    });
  }

  for (let i = 0; i < combined_txn_metrics.length; i++)
    combined_txn_metrics[i]["id"] = i;

  app_gas_cost_graph_data["column_data"] = column_data;
  app_gas_cost_graph_data["table_data"] = combined_txn_metrics;
  app_gas_cost_graph_data["initial_state"] = initial_state;

  return app_gas_cost_graph_data;
}
