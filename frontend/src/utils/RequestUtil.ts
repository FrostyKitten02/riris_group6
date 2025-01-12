import {RawAxiosRequestConfig} from "axios";


export class RequestUtil {
    private constructor() {}

    public static getBaseApiUrl() {
        return import.meta.env.VITE_BASE_API_URL;
    }

    public static getDefaultRequestConfig(token: string | null): RawAxiosRequestConfig {
        return {
            headers: {
                Authorization : "Bearer " + token
            }
        }
    }

}