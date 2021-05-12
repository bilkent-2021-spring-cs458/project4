import axios from "axios";
import { setLocalStorage } from "./LocalStorageWithExpiry";

const baseUrl = "https://52.59.101.158:4581/api";

export const signin = async (params, remember) => {
    const response = await axios.post(baseUrl + "/login", null, {
        withCredentials: true,
        params: params,
    });
    if (response.status !== 200) {
        throw response;
    }

    setLocalStorage("email", params.email, remember);
    setLocalStorage("isSignedIn", true);
    return response;
};

export const signup = async (params) => {
    const response = await request(
        axios.post,
        baseUrl + "/user/register",
        params
    );
    console.log("signup", response);
    if (response.status != 200) {
        throw response;
    }
    setLocalStorage("email", params.email);

    await signin({ username: params.email, password: params.password });
    return response;
};

export const editInfo = async (params) => {
    const response = await request(
        axios.patch,
        baseUrl + "/user/account",
        params
    );
    if (response.status !== 200) {
        throw response;
    }

    return response;
};

const request = async (method, url, params) => {
    try {
        var response;
        if (params) {
            response = await method(url, params, { withCredentials: true });
        } else {
            response = await method(url, { withCredentials: true });
        }

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return {
                status: -1,
                data: {},
            };
        }
    }
};
