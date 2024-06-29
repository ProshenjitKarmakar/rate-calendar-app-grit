import axios, { AxiosError, AxiosResponse } from 'axios';
import {getCookie} from "@/helpers/Cookie";
import ResponseInterface from "@/interfaces/response.interface";

const accessToken = process.env.NEXT_PUBLIC_APP_ACCESS_TOKEN;
if (!accessToken) throw Error('Access token not found in process env!');

const apiBaseUrl = process.env.NEXT_PUBLIC_NODE_API_BASE_URL;
if (!apiBaseUrl) throw Error('API Base Url not found in process env!');

const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = getCookie(accessToken);
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// ## handle http request response
const responseBody = (response: AxiosResponse) => {
    return response.data;
};

// ## handle http request error
const errorResponseBody = (error: AxiosError) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return error.response.data;
    } else if (error.request) {
        throw Error('Error: axios ', error.request);
    } else {
        throw Error('Error: axios ', error.request);
    }
};

const httpRequest = {
    get: <T>(url = '', params = {}) =>
        axiosInstance
            .get<ResponseInterface<T>>(url, {
                params: params,
            })
            .then(responseBody)
            .catch(errorResponseBody),

    post: <T>(url = '', body = {}, config = {}) =>
        axiosInstance.post<ResponseInterface<T>>(url, body, config).then(responseBody).catch(errorResponseBody),

    put: <T>(url = '', body = {}) => axiosInstance.put<ResponseInterface<T>>(url, body, {}).then(responseBody).catch(errorResponseBody),

    delete: <T>(url = '', params = {}, body = {}) =>
        axiosInstance
            .delete<ResponseInterface<T>>(url, {
                data: body,
                params: params,
            })
            .then(responseBody)
            .catch(errorResponseBody),
};

export default httpRequest;
