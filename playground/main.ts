import RusselClient from "../src/russelClient";
import type {IRusselSetPayload} from "../src/models/IRusselPayload";

async function main() {
    const testClient = new RusselClient();

    try {
        const payload: IRusselSetPayload = {
            cluster: 'tsCluster',
            key: 'ts',
            value: 'cluster'
        }
        const partials = {
            cluster: 'newTest',
            key: 'testNew2',
        }
        const setResponse = await testClient.set(payload);
        console.log("Set Response:", setResponse.isSuccess);

        const getResponse = await testClient.getKeysOfCluster('newTest');
        console.log("Decoded Value:", getResponse.data);
        // const response = await testClient.getKeysOfCluster(partails);
        console.log("Raw Value:", getResponse);
        // const decodedValue = response.decodeData();
        // console.log("Decoded Value:", decodedValue);
    } catch (error: any) {
        console.error("Error:", error.message);
    }
}

// Run the main function
main();
