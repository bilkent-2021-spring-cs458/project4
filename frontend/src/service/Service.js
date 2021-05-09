import axios from "axios";
import {
    clearLocalStorageWithTTL,
    setLocalStorage,
} from "./LocalStorageWithExpiry";

const baseUrl = "/api";

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

export const signin = async (params) => {
    console.log(params);
    const response = await request(axios.post, baseUrl + "/login", params);
    if (response.status !== 200) {
        throw response;
    }

    setLocalStorage("email", params.email, params.remember);
    setLocalStorage("isSignedIn", true);
    return response;
};

export const signup = async (params) => {
    const response = await request(axios.post, baseUrl + "/signup", params);
    if (response.status !== 200) {
        throw response;
    }

    setLocalStorage("isSignedIn", true);
    setLocalStorage("email", params.email);
    return response;
};

export const signout = async () => {
    await request(axios.post, baseUrl + "/logout");
    clearLocalStorageWithTTL();
    sessionStorage.clear();
};

export const setPaymentPlan = async (params) => {
    const response = await request(axios.post, baseUrl + "/set_plan", params);
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
