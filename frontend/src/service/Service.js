import axios from "axios";
import {
    clearLocalStorageWithTTL,
    setLocalStorage,
} from "./LocalStorageWithExpiry";

const baseUrl = "https://52.59.101.158:4581/api";

export const getUserDetails = async () => {
    const response = await request(axios.post, baseUrl);
    if (response.status !== 200) {
        throw response;
    }

    return response;
};

export const checkEmail = async (email) => {
    const response = await request(axios.post, baseUrl + "/check_email", {
        email,
    });
    if (response.status !== 200) {
        throw response;
    }

    return response;
};

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
    if (response.status != 200) {
        throw response;
    }
    setLocalStorage("email", params.email);
    setLocalStorage("password", params.password);

    signin({ username: params.email, password: params.password });
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

    setLocalStorage("email", params.fullname);
    setLocalStorage("email", params.age);
    setLocalStorage("email", params.gender);
    setLocalStorage("email", params.city);
    setLocalStorage("email", params.status);
    setLocalStorage("email", params.password);
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

        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        if (error.response) {
            return {
                status: error.response.status,
                data: error.response.data,
            };
        } else {
            return {
                status: 503,
                data: {},
            };
        }
    }
};
