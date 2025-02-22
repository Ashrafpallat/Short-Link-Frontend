import api from "./axiosInstance";

export const urlHistory = async () => {
    const response = await api.get("/url/history");
    return response
}
export const shortenUrl = async (originalUrl) => {
    const response = await api.post("/url/shorten", { originalUrl });
    return response
}