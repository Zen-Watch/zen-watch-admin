export function filter_output_json(outputJson: any) {
    const newJson = JSON.parse(JSON.stringify(outputJson));

    if (outputJson && 'is_trigger_trusted_source' in outputJson)
        delete newJson.is_trigger_trusted_source;

    if (outputJson && 'is_trigger_compute_intensive' in outputJson)
        delete newJson.is_trigger_compute_intensive;

    if (outputJson && 'is_trigger_push_mechanism' in outputJson)
        delete newJson.is_trigger_push_mechanism;

    // Check if the 'trigger_info.trigger_id' field exists in the original JSON object
    if (outputJson?.trigger_info?.trigger_id)
        delete newJson.trigger_info.trigger_id;

    return newJson;
}

// same definition as instance-worker, action-worker from the backend
export const IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_FATAL_ERROR = -1;
export const IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_UNPROCESSED = 0;
export const IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_UNDER_PROCESSING = 1;
export const IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_SUCCESS = 2;
export const IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_FAILURE = 3;

export function get_ifttt_batch_processing_status(status: number) {
    switch (status) {
        case IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_FATAL_ERROR:
            return 'Fatal Error';
        case IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_UNPROCESSED:
            return 'Unprocessed';
        case IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_UNDER_PROCESSING:
            return 'Under Processing';
        case IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_SUCCESS:
            return 'Success';
        case IFTTT_TRIGGER_RUN_HISTORY_WORKER_STATUS_FAILURE:
            return 'Failure';
        default:
            return 'Unknown';
    }
}

export function cleanAndParseJSON(rawJSON: any) {
    console.log("Calling cleanAndParseJSON with rawJSON", rawJSON);

    // Remove all whitespace except for whitespace within quotes
    const cleanedInput = rawJSON.replace(/(?!\B"[^"]*)\s+(?![^"]*"\B)/g, "");
    console.log("cleanedInput", cleanedInput);

    // Convert to valid json
    const transformedJsonInput = cleanedInput
      .replace(/\n|\r|\t/g, "")
      .replace(/(?:^|\s)(["'[{])/g, "$1")
      .replace(/(["'\]}])(?:\s|$)/g, "$1");

    // Remove trailing commas
    const noTrailingCommaInput = transformedJsonInput.replace(
      /,\s*([\]}])/g,
      "$1"
    );
    console.log("noTrailingCommaInput", noTrailingCommaInput);

    try {
      const parsedInput = JSON.parse(noTrailingCommaInput);
      console.log("parsedInput", parsedInput);
      return parsedInput;
    } catch (e) {
      console.log(e);
      console.error(`Error parsing JSON: ${e}`);
      return null;
    }
  }