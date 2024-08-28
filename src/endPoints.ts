import {errorHandler} from "./utilities/globalErrorHandler";
import {customFetch} from "./utilities/customFetch";
import {partialItemEncoder} from "./utilities/UrlCreator";
import {IRusselPartials, IRusselSetPayload} from "./models/IRusselPayload";
import {IApiResponseData} from "./models/IApiResponse";
import {ServiceResult} from "./utilities/ServiceResult";

async function setKey(baseUrl: string, payload: IRusselSetPayload): Promise<IApiResponseData> {
    try {
        const url = `${baseUrl}/set`;
        const response = await customFetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),

        });
        return new ServiceResult('operation successful', await response.json()).ok()
    } catch (e: any) {
        errorHandler(e)
        return new ServiceResult('operation failure').failure()
    }
}

async function getCluster(baseUrl: string, partials: IRusselPartials) {
    /// expected payload {
    // cluster
    // key
    // }
    try {
        let url = `${baseUrl}/get/${partialItemEncoder(partials.cluster)}/${partialItemEncoder(partials.key)}`;
        const response = await customFetch(url, {
            method: 'GET',
        });
        return new ServiceResult('operation successful', await response.json()).ok()

    } catch (e: any) {
        errorHandler(e)
        return new ServiceResult('operation failure').failure()
    }
}

async function deleteCluster(baseUrl: string, partials: IRusselPartials) {
    /// expected payload {
    // cluster
    // key
    // }
    try {
        const url = `${baseUrl}/delete/${partialItemEncoder(partials.cluster)}/${partialItemEncoder(partials.key)}`;
        const response = await customFetch(url, {
            method: 'DELETE',

        });
        return new ServiceResult('operation successful', await response.json()).ok()

    } catch (e: any) {
        errorHandler(e)
        return new ServiceResult('operation failure').failure()

    }
}

async function clearCluster(baseUrl: string, cluster: string) {
    /// expected string cluster
    try {
        const url = `${baseUrl}/clear_cluster/${partialItemEncoder(cluster)}`;
        const response = await customFetch(url, {
            method: 'DELETE'
        });
        return new ServiceResult('operation successful', await response.json()).ok()

    } catch (e: any) {
        errorHandler(e)
        return new ServiceResult('operation failure').failure()

    }
}

async function getKeysOfCluster(baseUrl: string, cluster: string) {
    /// expected string cluster
    try {
        const url = `${baseUrl}/get_keys/${partialItemEncoder(cluster)}`;
        const response = await customFetch(url, {
            method: 'GET',
        });
        return new ServiceResult('operation successful', await response.json()).ok()

    } catch (e: any) {
        errorHandler(e)
        return new ServiceResult('operation failure').failure()
    }
}

async function setCluster(baseUrl: string, cluster: string) {
    /// expected string cluster

    try {
        const url = `${baseUrl}/set_cluster${partialItemEncoder(cluster)}`;
        const response = await customFetch(url, {
            method: 'POST',
        });
        return new ServiceResult('operation successful', await response.json()).ok()

    } catch (e: any) {
        errorHandler(e)
        return new ServiceResult('operation failure').failure()
    }
}

async function checkConnection(baseUrl: string) {
    try {
        const url = `${baseUrl}/get/check`;
        const response = await customFetch(url, {
            method: 'GET',
        });
        return new ServiceResult('operation successful', await response.json()).ok()

    } catch (e: any) {
        errorHandler(e)
        return new ServiceResult('operation failure').failure()
    }
}

async function getAllClusters(baseUrl: string) {
    try {
        const url = `${baseUrl}/get_clusters`;
        const response = await customFetch(url, {
            method: 'GET',
        });
        return new ServiceResult('operation successful', await response.json()).ok()

    } catch (e: any) {
        errorHandler(e)
        return new ServiceResult('operation failure').failure()

    }
}

export {
    getAllClusters,
    setKey,
    getCluster,
    deleteCluster,
    clearCluster,
    getKeysOfCluster,
    setCluster,
    checkConnection
}
