import { tokens } from "../../../theme";
import { IHash } from "../../../util/constants";

export function prepareGasCostFiatProfitLossDataForAggregation(data: any) {
  // const app_pl_fiat_data_points = [
  //     {
  //       x: "plane",
  //       y: 101,
  //     },
  //     {
  //       x: "helicopter",
  //       y: 75,
  //     },
  // ]

  interface AppProfitLossDataPoints {
    x: any;
    y: any;
    txn_hash: any;
  }

  const APP_TOTAL_PROFIT_LOSS_FIAT_LINE = "app_total_profit_loss_fiat";
  const APP_CHARGE_INCL_TXN_COST_FIAT_LINE = "app_charge_incl_txn_cost_fiat";
  const APP_CHARGE_EXCL_TXN_COST_FIAT_LINE = "app_charge_excl_txn_cost_fiat";
  const FINAL_TXN_FEE_FIAT = "final_txn_fee_fiat";

  const app_total_profit_loss_fiat_data_points: AppProfitLossDataPoints[] = [];
  const app_charge_incl_txn_cost_fiat_data_points: AppProfitLossDataPoints[] =[];
  const app_charge_excl_txn_cost_fiat_data_points: AppProfitLossDataPoints[] =[];
  const final_txn_fee_fiat_data_points: AppProfitLossDataPoints[] = [];

  let app_total_profit_loss_fiat_sum:number = 0;
  const x_name = "Event Creation Time";
  const exchange_currency = data.exchange_currency
  const y_name = exchange_currency;

  const gas_cost_inverted_index: IHash = {}

  const app_gas_cost_graph_data = {
    gas_cost_inverted_index,
    app_total_profit_loss_fiat_sum,
    exchange_currency,
    x_name,
    y_name,
    graph_data: [
    {
      id: APP_TOTAL_PROFIT_LOSS_FIAT_LINE,
      color: tokens("dark").greenAccent[500],
      data: app_total_profit_loss_fiat_data_points,
    },
    {
      id: APP_CHARGE_INCL_TXN_COST_FIAT_LINE,
      color: tokens("dark").blueAccent[300],
      data: app_charge_incl_txn_cost_fiat_data_points,
    },
    {
      id: APP_CHARGE_EXCL_TXN_COST_FIAT_LINE,
      color: tokens("dark").greenAccent[300],
      data: app_charge_excl_txn_cost_fiat_data_points,
    },
    {
      id: FINAL_TXN_FEE_FIAT,
      color: tokens("dark").blueAccent[500],
      data: final_txn_fee_fiat_data_points,
    },
  ]};

  // Combine success/error txns for this view
  const combined_txn_metrics = [
    ...data.successful_txn_metrics,
    ...data.error_txn_metrics,
  ];

  // calculate successful metrics as well
  for (let metric of combined_txn_metrics) {
    // POPULATE THE INVERTED INDEX FOR TABLE LOOK UP
    gas_cost_inverted_index[metric.txn_hash] = metric

    // LINE 1: APP_TOTAL_PROFIT_LOSS_FIAT_LINE
    const app_total_profit_loss_fiat_data_point = {
      x: metric.created_ts,
      y: metric.app_total_profit_loss_fiat,
      txn_hash: metric.txn_hash,
    };
    app_total_profit_loss_fiat_data_points.push(
      app_total_profit_loss_fiat_data_point
    );

    // SUMMARY ON TOP
    app_total_profit_loss_fiat_sum += metric.app_total_profit_loss_fiat;

    // LINE 2: APP_CHARGE_INCL_TXN_COST_FIAT_LINE
    const app_charge_incl_txn_cost_fiat_data_point = {
      x: metric.created_ts,
      y: metric.app_charge_incl_txn_cost_fiat,
      txn_hash: metric.txn_hash,
    };
    app_charge_incl_txn_cost_fiat_data_points.push(
      app_charge_incl_txn_cost_fiat_data_point
    );

    // LINE 3: APP_CHARGE_EXCL_TXN_COST_FIAT_LINE
    const app_charge_excl_txn_cost_fiat_data_point = {
        x: metric.created_ts,
        y: metric.app_charge_excl_txn_cost_fiat,
        txn_hash: metric.txn_hash,
      };
      app_charge_excl_txn_cost_fiat_data_points.push(
        app_charge_excl_txn_cost_fiat_data_point
      );
    
    // LINE 4: APP_CHARGE_EXCL_TXN_COST_FIAT_LINE
    const final_txn_fee_fiat_data_point = {
        x: metric.created_ts,
        y: metric.final_txn_fee_fiat,
        txn_hash: metric.txn_hash,
      };
      final_txn_fee_fiat_data_points.push(
        final_txn_fee_fiat_data_point
      );
  }

  // Override summed value of total_profit for summary display
  app_gas_cost_graph_data['app_total_profit_loss_fiat_sum'] = app_total_profit_loss_fiat_sum

  return app_gas_cost_graph_data;
}
