const express = require('express');
const app = express()

const fetch = require("node-fetch");

const port = process.env.PORT;

app.set('view engine', 'ejs');

//---------Routes-----------------------

app.get('/:profile', (req, res) => {
    res.render('profile', {profile:req.params.profile});
})

app.listen(port, () => {
    console.log(`Example app listening at `+port)
})

app.get('/', (req, res) => {
    res.render('profile', {profile:"elonmusk"});
})

//------Rest API that returns {word="dq", count=3} json----------

app.get('/rest/profile/:profile', async (req, res) => {
    try{
        //parsing tweet json -> tweet text -> word, count
        tweets = await getTweetsByProfile(req.params.profile)
        tweets = await parseTweets(tweets)
        tweets = Array.from(tweets, ([word, count]) => ({word, count}))
        
        console.log("Profile request satisfied for "+req.params.profile+", found "+tweets.length+" words.")
        
        //cleaning up the data        
        tweets.sort(function(a, b){return b.count - a.count});
        if(tweets.length>200){
            tweets = tweets.slice(0, 199);
        }

        res.json(tweets)
        //res.render('profile', {words: tweets})
        //res.send(tweets)
    } catch(error){
        console.log(error)
    }
})

//---------Funcs--------------------------------------

const parseTweets = async (tweets) => {
    let words = new Map()
    pattern = /(?! '. *')\b[\w']+\b/g //regex for word(s)
    tweets.forEach(tweet => {
        temp = tweet.text.match(pattern);
        temp.forEach(word => {
            if(words.has(word)){
                words.set(word, words.get(word)+1)
            }
            else{
                words.set(word, 1)
            }
        })
    })
    return words
}

//---------Making GET requests to twitter---------------------

//you need a bearer code from your twitter dev account here
bearer = process.env.twitterBearer;

const defaultFetchOptions = {
    method: 'GET',
    headers: {  
        'Authorization': `Bearer `+ bearer,
    },
};

const getTweetsByProfile = async (profile) => {
    url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='+profile+'&count=200'
    //console.log('attempting API call at: '+url)
    const response = await fetch(url, defaultFetchOptions);
    const responseJson = await response.json();
    return responseJson
};
