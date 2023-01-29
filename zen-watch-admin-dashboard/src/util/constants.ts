// App state
export const CONNECTED = "connected";
export const DISCONNECTED = "disconnected";

// reducer names
export const APP_STATE = "app";

// HTTP status codes
export const STATUS_OK = 200;
export const UNAUTHORIZED_ACCESS=401;
export const STATUS_NOT_FOUND = 404;
export const STATUS_UNPROCESSABLE_ENTITY = 422;
export const INTERNAL_SERVER_ERROR = 500;

// common interfaces
export interface IHash {
  [key: string]: any;
}

// Views
export const GAS_COST_GRAPH_VIEW = "Graph View";
export const GAS_COST_TABLE_VIEW = "Table View"
