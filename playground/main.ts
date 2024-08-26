import RusselClient from "../src/russelClient";

async function main() {
    const testClient = new RusselClient('admin', '123456');
    testClient.authorize()
    try {
        await testClient.getAllClusters()
        const res = await testClient.getAllClusters()
        console.log(res)
    } catch (error: any) {
        console.error("Error:", error.message);
    }
}

// Run the main function
main();
