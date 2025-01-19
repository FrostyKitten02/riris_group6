import {StringUtil} from "./StringUtil";

export interface Config {
    clerkPublishable: string,
    baseBackendUrl: string,
}

interface NullableConfig {
    clerkPublishable: string | null,
    baseBackendUrl: string | null,
}

export class ConfigUtil {
    private constructor() {}

    private static config: Config | null = null;

    public static getConfig(): Config {
        if (this.config == null) {
            throw new Error("Missing config")
        }

        return this.config;
    }

    public static readConfig(): Config {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', "/conf.json", false);  // `false` makes the request synchronous
        xhr.send(null);

        if (xhr.status != 200) {
            throw new Error('Failed to fetch JSON. Status: ' + xhr.status);
        }

        const config = JSON.parse(xhr.responseText) as NullableConfig;
        const validatedConf = this.validateConfig(config);
        this.config = validatedConf;
        return validatedConf;
    }

    private static validateConfig(conf: NullableConfig): Config {
        if (StringUtil.emptyOrNull(conf.baseBackendUrl)) {
            throw new Error("Missing base api url")
        }

        if (StringUtil.emptyOrNull(conf.clerkPublishable)) {
            throw new Error("Missing Publishable Key")
        }

        return conf as unknown as Config;
    }
}
