import RusselClient from "../src/russelClient";

async function main() {
    const testClient = new RusselClient();
    testClient.setRusselConfig({
        baseUrl: 'http://127.0.0.1:6022'
    })
    try {
        await testClient.set({
            cluster:'thispc',
            key:'amirhosein',
            value:'soleymani'
        })
        const res =await testClient.getAllClusters()
        console.log(res.data)
    } catch (error: any) {
        console.error("Error:", error.message);
    }
}

// Run the main function
main();
