# Russel Client In TypeScript

This package is written in TypeScript in order to integrate with russel
## Setup

Make sure to install the dependencies:

```bash
# npm
npm install russel-ts

```
This package has zero dependencies so you should be fine with just installing the russel-ts

## Types

There are three different interfaces to use with russel-ts and they are all included in the package

```typescript
interface IRusselConfig {
    baseUrl?: string // default is set to http://127.0.0.1
    port?: number // default is set to 6022
}

// example usage
const RusselClient = new RusselClient()
RusselClient.setRusselConfig({
    // your configuration goes here...
})

interface IRusselPayload {
    cluster: string // cluster name
    key: string // key name
    value: string // value name
    ttl?: number // expiration time in seconds
}

// example usage
await RusselClient.set({
    cluster: 'foo',
    key: 'bar',
    value: 'fooBar',
    ttl: 1000
})

interface IRusselPartials {
    cluster: string // cluster name
    key: string // key name
}

// example usage
await RusselClient.get({
    cluster: 'foo',
    key: 'bar',
})
```


## Response

There are two ways to receive your response.
you can either get the raw value like below

```typescript
const res = await RusselClient.get({
    cluster: 'foo',
    key: 'bar',
})
console.log(res) // raw value
```
Or using a built in function that decodes the value

```typescript
const res = await RusselClient.get({
    cluster: 'foo',
    key: 'bar',
})
console.log(res.decodeData()) // decoded value
```
## Internal Functions
russel-ts has a pretty easy to use API with functions that can operate as a CRUD.
here is an step by step guide after configuring russel-ts in order to use it's APIs.

```typescript
const RusselClient = new RusselClient()

// Set a value and cluster
try {
    const res = await RusselClient.set({
        cluster: 'foo',
        key: 'bar',
        value: 'fooBar',
    })
    console.log('value set successfully')
} catch (error) {
    console.log(error)
}

// Get a value with it's key and cluster
try {
    const res = await RusselClient.getCluster({
        cluster: 'foo',
        key: 'bar',
    })
    console.log(res.decodeData()) // fooBar
} catch (error) {
    console.log(error)
}

// Delete a cluster's value
try {
    const res = await RusselClient.deleteCluster({
        cluster: 'foo',
        key: 'bar',
    })
    console.log(res) // value deleted
} catch (error) {
    console.log(error)
}

// Clearing a cluster
try {
    const res = await RusselClient.clearCluster('foo') // cluster name
    console.log(res) // cluster cleared
} catch (error) {
    console.log(error)
}

// Listing all keys of a cluster
try {
    const res = await RusselClient.getKeysOfCluster('foo') // cluster name
    console.log(res) // ['foo']
} catch (error) {
    console.log(error)
}


// Set a new cluster without any key value pairs
try {
    const res = await RusselClient.setCluster('foo') // cluster name
    console.log(res) // ['foo']
} catch (error) {
    console.log(error)
}

// Cheking the connection of russel-ts
try {
    const res = await RusselClient.checkConnection() // cluster name
    console.log(res) 
} catch (error) {
    console.log(error)
}
```
## Key points
All responses are returned in shape of a service result like this

```typescript
return {
    is_success: boolean, // operation status
    data: this.data, // data itself
    message: this.message // message
}
```
In Case of any errors happening, it will be thrown with is_success set to false.


```typescript
return {
    is_success: false, // operation status
    message: this.message // error message
}
```


Check out the [github organization](https://github.com/russel-io) for more information.
