import RusselClient from "../src/russelClient";

async function main() {
    const testClient = new RusselClient();
    testClient.setRusselConfig({
        port:6022
    })
    try {
        await testClient.set({
            cluster:'thispc',
            key:'amirhosein',
            value:'soleymani'
        })
        const res =await testClient.getAllClusters()
        console.log(res)
    } catch (error: any) {
        console.error("Error:", error.message);
    }
}

// Run the main function
main();
