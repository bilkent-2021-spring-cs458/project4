import axios from "axios";
import qs from "querystring";
import {
    clearLocalStorageWithTTL,
    setLocalStorage,
} from "./LocalStorageWithExpiry";

const baseUrl = "https://52.59.101.158:4581/api";

export const getUserDetails = async () => {
    console.log("hi");
    await axios.post(baseUrl + "/login", null, {
        withCredentials: true,
        params: { username: "12@12.com", password: "12345" },
    });
    const response = await request(axios.get, baseUrl + "/user/account");
    if (response.status !== 200) {
        console.log(response);
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

export const getUserSymptoms = async () => {
    const response = await request(axios.get, baseUrl + "/user/symptom");
    if (response.status !== 200) {
        throw response;
    }

    return response;
};

export const addNewSymptom = async (symp) => {
    await axios.post(baseUrl + "/login", null, {
        withCredentials: true,
        params: { username: "12@12.com", password: "12345" },
    });
    const response = await request(axios.put, baseUrl + "/user/symptom", symp);
    if (response.status !== 200) {
        console.log(response);
        throw response;
    }

    return response;
};

export const signin = async (params) => {
    console.log(params);
    const response = await axios.post(baseUrl + "/login", null, {
        withCredentials: true,
        params: { username: "12@12.com", password: "12345" },
    });

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

        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            return {
                status: -1,
            };
        }
    }
};
