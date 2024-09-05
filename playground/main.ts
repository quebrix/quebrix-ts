import QuebrixClient from "../src/QuebrixClient";

async function main() {
    const testClient = new QuebrixClient('admin', '123456');

    try {
        await testClient.set({
            cluster:'test',
            key:'auth',
            value:'saman'
        })
        const res = await testClient.getAllClusters()
        console.log(res)
    } catch (error: any) {
        console.error("Error:", error.message);
    }
}

// Run the main function
main();
