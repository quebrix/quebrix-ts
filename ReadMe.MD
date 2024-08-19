# 🚀 Russel Client in TypeScript

Welcome to the **Russel Client** package! This library, crafted in TypeScript, enables seamless integration with the Russel service.

## ⚙️ Setup

Get started by installing the package:

```bash
# npm
npm install russel-ts
```

# 🛠️ Types & Interfaces

russel-ts comes with three essential interfaces that you can leverage to configure and interact with Russel:

`IRusselConfig`

Defines the configuration settings for the Russel client.

```typescript
interface IRusselConfig {
    baseUrl?: string // default: 'http://127.0.0.1'
    port?: number // default: 6022
}

// Example usage:
const russelClient = new RusselClient();
russelClient.setRusselConfig({
    // your configuration goes here...
});
```

`IRusselPayload`

Specifies the structure for setting data within a cluster.


```typescript
interface IRusselPayload {
    cluster: string // cluster name
    key: string // key name
    value: string // value name
    ttl?: number // expiration time in seconds
}

// Example usage:
await russelClient.set({
    cluster: 'foo',
    key: 'bar',
    value: 'fooBar',
    ttl: 1000
});
```


`IRusselPartials`

Defines the structure for retrieving data from a cluster.


```typescript
interface IRusselPartials {
    cluster: string // cluster name
    key: string // key name
}

// Example usage:
await russelClient.get({
    cluster: 'foo',
    key: 'bar',
});
```

# 📬 Handling Responses
Russel-ts offers two ways to handle responses from your client operations:

1. Raw value

Retrieve the raw value directly:

```typescript
const res = await russelClient.get({
    cluster: 'foo',
    key: 'bar',
});
console.log(res); // raw value

```

2. Decoded Value



Alternatively, decode the value using the built-in function:

```typescript
const res = await russelClient.get({
    cluster: 'foo',
    key: 'bar',
});
console.log(res.decodeData()); // decoded value


```


# 🔄 Internal Functions
`russel-ts` provides a straightforward API for CRUD operations. Here's a step-by-step guide on using its functionalities:


## Set a Value in a Cluster

```typescript
try {
    const res = await russelClient.set({
        cluster: 'foo',
        key: 'bar',
        value: 'fooBar',
    });
    console.log('Value set successfully');
} catch (error) {
    console.error(error);
}
```
## Get a Value from a Cluster

```typescript
try {
    const res = await russelClient.getCluster({
        cluster: 'foo',
        key: 'bar',
    });
    console.log(res.decodeData()); // 'fooBar'
} catch (error) {
    console.error(error);
}

```
## Delete a Value from a Cluster


```typescript
try {
    const res = await russelClient.deleteCluster({
        cluster: 'foo',
        key: 'bar',
    });
    console.log('Value deleted');
} catch (error) {
    console.error(error);
}


```
## Clear a Cluster

```typescript
try {
    const res = await russelClient.clearCluster('foo'); // cluster name
    console.log('Cluster cleared');
} catch (error) {
    console.error(error);
}


```
## List All Keys in a Cluster


```typescript
try {
    const res = await russelClient.getKeysOfCluster('foo'); // cluster name
    console.log(res); // ['bar']
} catch (error) {
    console.error(error);
}

```

## Create a New Cluster



```typescript
try {
    const res = await russelClient.setCluster('foo'); // cluster name
    console.log('Cluster created');
} catch (error) {
    console.error(error);
}


```

## Check Russel-ts Connection

```typescript
try {
    const res = await russelClient.checkConnection();
    console.log('Connection successful');
} catch (error) {
    console.error(error);
}


```

# 🔑 Key Points

All responses are returned in the following format:

```typescript
{
    is_success: boolean, // operation status
    data: this.data, // data itself
    message: this.message // message
}

```
In case of errors, the response will include is_success set to false:

```typescript
{
    is_success: false, // operation status
    message: this.message // error message
}

```

For more details, visit our [GitHub organization](https://github.com/russel-io/). Happy coding! 🎉



