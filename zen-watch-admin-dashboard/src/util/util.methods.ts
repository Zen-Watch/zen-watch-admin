
export async function make_api_request(url:string, payload:any){
    const response = await fetch(url, payload);
    return await response.json();
}