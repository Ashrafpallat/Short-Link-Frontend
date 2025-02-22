import api from "./axiosInstance";

export const userSignup = async (name, email, password) => {
    const { data } = await api.post("/auth/signup", { name, email, password })
}
export const userLogin = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password })
    return data
}
export const userLogout = async () => {
    await api.post("/auth/logout", {});
}
