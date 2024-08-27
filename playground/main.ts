import RusselClient from "../src/russelClient";

async function main() {
    const testClient = new RusselClient('admin', '123456');
    await testClient.authorize()
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
