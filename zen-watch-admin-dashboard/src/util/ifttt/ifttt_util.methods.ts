export function filter_output_json(outputJson: any) {
    const newJson = { ...outputJson };

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