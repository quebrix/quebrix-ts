import {
    checkConnection,
    clearCluster,
    deleteCluster,
    getAllClusters,
    getCluster,
    getKeysOfCluster,
    setCluster,
    setKey,
} from "./endPoints";
import {setToken} from "./utilities/customFetch";
import type {IApiResponseData} from "./models/IApiResponse";
import type {IQuebrixPartials, IQuebrixSetPayload} from "./models/IQuebrixPayload";
import {IQuebrixConfig} from "./models/IQuebrixConfig";

// Define the structure of the API response

// ApiResponse class
class ApiResponse {
    isSuccess: boolean;
    data: any;

    constructor(isSuccess: boolean, data: any) {
        this.isSuccess = isSuccess;
        this.data = data;
    }

    static fromDict(data: IApiResponseData): ApiResponse {
        return new ApiResponse(data.is_success, data.data);
    }

    decodeData(encoding: BufferEncoding = "utf-8"): string | any {
        if (Array.isArray(this.data)) {
            return Buffer.from(this.data).toString(encoding);
        }
        return this.data;
    }
}


class QuebrixClient {
    private baseUrl: string;
    private password: string;
    private username: string;
    // @ts-ignore
    private authHeaderValue: string;

    constructor(username: string, password: string) {
        this.baseUrl = "http://127.0.0.1:6022/api";
        this.username = username
        this.password = password
        this.authorize()

    }

    async setQuebrixConfig(QuebrixConfig: IQuebrixConfig): Promise<void> {
        this.baseUrl = `${QuebrixConfig.baseUrl ? QuebrixConfig.baseUrl : 'http://127.0.0.1'}:${QuebrixConfig.port ? QuebrixConfig.port : '6022'}/api`;
        if (QuebrixConfig.password) {
            this.password = QuebrixConfig.password
        }
        if (QuebrixConfig.username) {
            this.username = QuebrixConfig.username
        }
    }

    async authorize() {
        await this.setGlobalAuthHeader()
        setToken(this.authHeaderValue)
    }

    async setGlobalAuthHeader() {
        const encoder = new TextEncoder()
        const authHeaderByte: any = encoder.encode(this.username.concat(':', this.password))
        this.authHeaderValue = btoa(String.fromCharCode.apply(null, authHeaderByte))
    }

    private async _handleResponse(response: IApiResponseData): Promise<ApiResponse> {
        if (!response.is_success) {
            throw new Error(response.message || "Unknown error");
        }
        return ApiResponse.fromDict(response.data);
    }

    async set(payload: IQuebrixSetPayload): Promise<ApiResponse> {
        const response = await setKey(this.baseUrl, payload);
        return await this._handleResponse(response);
    }

    async get(partials: IQuebrixPartials): Promise<ApiResponse> {
        const response = await getCluster(this.baseUrl, partials);
        return await this._handleResponse(response);
    }

    async delete(partials: IQuebrixPartials): Promise<ApiResponse> {
        const response = await deleteCluster(this.baseUrl, partials);
        return await this._handleResponse(response);
    }

    async clearCluster(cluster: string): Promise<ApiResponse> {
        const response = await clearCluster(this.baseUrl, cluster);
        return await this._handleResponse(response);
    }

    async getKeysOfCluster(cluster: string): Promise<ApiResponse> {
        const response = await getKeysOfCluster(this.baseUrl, cluster);
        return await this._handleResponse(response);
    }

    async getAllClusters(): Promise<ApiResponse> {
        const response = await getAllClusters(this.baseUrl);
        return await this._handleResponse(response);
    }

    async setCluster(cluster: string): Promise<ApiResponse> {
        const response = await setCluster(this.baseUrl, cluster);
        return await this._handleResponse(response);
    }

    async checkConnection(): Promise<ApiResponse> {
        const response = await checkConnection(this.baseUrl);
        return await this._handleResponse(response);
    }
}

export default QuebrixClient;