import {RawAxiosRequestConfig} from "axios";
import {ConfigUtil} from "./ConfigUtil";


export class RequestUtil {
    private constructor() {}

    public static getBaseApiUrl() {
        return ConfigUtil.getConfig().baseBackendUrl;
    }

    public static getDefaultRequestConfig(token: string | null): RawAxiosRequestConfig {
        return {
            headers: {
                Authorization : "Bearer " + token
            }
        }
    }

}