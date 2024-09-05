# 🚀 Quebrix Client in TypeScript

Welcome to the **Quebrix Client** package! This library, crafted in TypeScript, enables seamless integration with the Quebrix service.

## ⚙️ Setup

Get started by installing the package:

```bash
# npm
npm install Quebrix-ts
```
Quebrix uses Authorization in order to set clusters. so you need to authorize yourself first.

## 🔒 Authorization

After installing the Quebrix application. Quebrix by default creates a user with this credentials

```bash
 admin // username
 123456 // password
```
This is the default user with the highest priority that can add and remove profiles.


If you need to authorize as another user, there are two different ways to do so.

## 1. Set user in constructor

```typescript

// Example usage:
const QuebrixClient = new QuebrixClient('admin','123456'); // first arg is username and second is password

```

## 2. Set user in QuebrixConfig

```typescript

// Example usage:
const QuebrixClient = new QuebrixClient(); // first arg is username and second is password
QuebrixClient.setQuebrixConfig({
    username:'admin',
    password:123456
})

```

# 🛠️ Types & Interfaces

Quebrix-ts comes with three essential interfaces that you can leverage to configure and interact with Quebrix:

`IQuebrixConfig`

Defines the configuration settings for the Quebrix client.

```typescript
interface IQuebrixConfig {
    baseUrl?: string // default: 'http://127.0.0.1'
    port?: number // default: 6022
    username?:string,
    password?:string 
}

// Example usage:
const QuebrixClient = new QuebrixClient();
QuebrixClient.setQuebrixConfig({
    // your configuration goes here...
});
```

`IQuebrixPayload`

Specifies the structure for setting data within a cluster.


```typescript
interface IQuebrixPayload {
    cluster: string // cluster name
    key: string // key name
    value: string // value name
    ttl?: number // expiration time in seconds
}

// Example usage:
await QuebrixClient.set({
    cluster: 'foo',
    key: 'bar',
    value: 'fooBar',
    ttl: 1000
});
```


`IQuebrixPartials`

Defines the structure for retrieving data from a cluster.


```typescript
interface IQuebrixPartials {
    cluster: string // cluster name
    key: string // key name
}

// Example usage:
await QuebrixClient.get({
    cluster: 'foo',
    key: 'bar',
});
```

# 📬 Handling Responses
Quebrix-ts offers two ways to handle responses from your client operations:

1. Raw value

Retrieve the raw value directly:

```typescript
const res = await QuebrixClient.get({
    cluster: 'foo',
    key: 'bar',
});
console.log(res); // raw value

```

2. Decoded Value



Alternatively, decode the value using the built-in function:

```typescript
const res = await QuebrixClient.get({
    cluster: 'foo',
    key: 'bar',
});
console.log(res.decodeData()); // decoded value


```


# 🔄 Internal Functions
`Quebrix-ts` provides a straightforward API for CRUD operations. Here's a step-by-step guide on using its functionalities:


## Set a Value in a Cluster

```typescript
try {
    const res = await QuebrixClient.set({
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
    const res = await QuebrixClient.getCluster({
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
    const res = await QuebrixClient.deleteCluster({
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
    const res = await QuebrixClient.clearCluster('foo'); // cluster name
    console.log('Cluster cleared');
} catch (error) {
    console.error(error);
}


```
## List All Keys in a Cluster


```typescript
try {
    const res = await QuebrixClient.getKeysOfCluster('foo'); // cluster name
    console.log(res); // ['bar']
} catch (error) {
    console.error(error);
}

```

## Create a New Cluster



```typescript
try {
    const res = await QuebrixClient.setCluster('foo'); // cluster name
    console.log('Cluster created');
} catch (error) {
    console.error(error);
}


```

## Check Quebrix-ts Connection

```typescript
try {
    const res = await QuebrixClient.checkConnection();
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

For more details, visit our [GitHub organization](https://github.com/Quebrix-io/). Happy coding! 🎉



