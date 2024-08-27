let fetch: typeof globalThis.fetch;
let token: string = '';
if (typeof globalThis.fetch !== 'function') {
    // Node.js < 18: use node-fetch
    // @ts-ignore
    fetch = (import('node-fetch')).default as typeof globalThis.fetch;
} else {
    // Node.js >= 18: use native fetch
    fetch = globalThis.fetch;
}
function setToken(generatedToken:string){
    token = generatedToken
}
async function customFetch(url: string, options: RequestInit): Promise<Response> {
    return await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers, // Include any other headers passed in options
            'Authorization': token
        },
    });
}

export {customFetch,setToken};
