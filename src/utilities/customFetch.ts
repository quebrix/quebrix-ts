let fetch: typeof globalThis.fetch;

if (typeof globalThis.fetch !== 'function') {
    // Node.js < 18: use node-fetch
    // @ts-ignore
    fetch = (import('node-fetch')).default as typeof globalThis.fetch;
} else {
    // Node.js >= 18: use native fetch
    fetch = globalThis.fetch;
}

async function customFetch(url: string, options: RequestInit): Promise<Response> {
    return await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers, // Include any other headers passed in options
        },
    });
}

export { customFetch };
