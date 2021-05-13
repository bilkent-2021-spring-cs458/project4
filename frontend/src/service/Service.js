import axios from "axios";
import {
    clearLocalStorageWithTTL,
    setLocalStorage,
} from "./LocalStorageWithExpiry";

const baseUrl = "/api";

export const getUserDetails = async () => {
    const response = await request(axios.get, baseUrl + "/user/account");
    if (response.status !== 200) {
        console.log(response);
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

export const signout = async () => {
    await axios.post(baseUrl + "/logout", null, {
        withCredentials: true,
    });
    clearLocalStorageWithTTL();
    sessionStorage.clear();
};

export const getUserSymptoms = async () => {
    const response = await request(axios.get, baseUrl + "/user/symptom");
    if (response.status !== 200) {
        throw response;
    }

    return response;
};

export const addNewSymptom = async (symp) => {
    const response = await request(axios.put, baseUrl + "/user/symptom", symp);
    if (response.status !== 200) {
        console.log(response);
        throw response;
    }

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
