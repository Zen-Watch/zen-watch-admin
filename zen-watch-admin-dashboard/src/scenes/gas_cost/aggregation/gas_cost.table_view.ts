import { IHash } from "../../../util/constants";

export function prepareGasCostFiatProfitLossDataForTableView(data: any) {
  const app_gas_cost_graph_data: IHash = {};

  // Combine success/error txns for this view
  const combined_txn_metrics = [
    ...data.successful_txn_metrics,
    ...data.error_txn_metrics,
  ];

  const column_data = [];
  
  // unique id for data grid
  column_data.push({
    field: 'id',
    headerName: 'id',
    flex: 0.5,
  });

  
  for (let key in combined_txn_metrics[0]) {
    column_data.push({
      field: key,
      headerName: key,
      flex: 1,
    });
  }

  console.log('lll', combined_txn_metrics)

  for (let i = 0; i < combined_txn_metrics.length; i++)
    combined_txn_metrics[i]['id'] = i

  app_gas_cost_graph_data["column_data"] = column_data;
  app_gas_cost_graph_data["table_data"] = combined_txn_metrics;

  console.log("RESULT", app_gas_cost_graph_data);

  return app_gas_cost_graph_data;
}
