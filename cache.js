const createClient = require('redis').createClient

// cache class
class Cache {

    // create client and check for any connection error
    constructor(){
        this.client = createClient()
        this.client.on('err', (err) => console.log('Redis client error: ', err))
    }

    // returns connection method
    connect(){
        return this.client.connect()
    }

    // set cache
    async set(key, value){
        await this.client.set(key, JSON.stringify(value))
    }

    // get cache if hit otherwise return null
    async get(key){
        const value = await this.client.get(key)
        return JSON.parse(value)
    }

    
}

module.exports = Cache
