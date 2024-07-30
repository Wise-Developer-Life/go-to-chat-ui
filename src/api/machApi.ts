import backendApiBase from "./baseApi";


export const startMatchApi =async () => {
    const res = await backendApiBase(true).post('/match');
    return res.data;
}
