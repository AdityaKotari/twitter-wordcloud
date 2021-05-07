const fetch = require("node-fetch");

bearer = process.env.twitterBearer;

const defaultFetchOptions = {
    headers: {
        'Authorization': `Bearer ` + bearer,
    },
};

const fetch_tweets = async ( handle, number ) => {
    const user = await lookupUser(handle)
    if(!user.id){
        return user
    }
    const url = 'https://api.twitter.com/2/users/' + user.id +'/tweets?max_results=' + number    
    try{
        const response = await fetch(url, defaultFetchOptions)
        const tweets = await response.json()
        return tweets
    } catch(error){
        console.log(error)
    }
    
}

const lookupUser = async ( handle ) => {
    const url = 'https://api.twitter.com/2/users/by/username/' + handle;
    try{
        const userLookup = await fetch( url, defaultFetchOptions )
        const user = await userLookup.json()
        return user.data
    } catch( error ) {
        console.log( error )
    }
}

module.exports = fetch_tweets