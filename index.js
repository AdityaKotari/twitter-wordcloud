const express = require('express');
const app = express()

sw = require('stopword')

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

        res.json(await parseTweets(tweets))
    } catch(error){
        console.log(error)
    }
})

//---------Funcs--------------------------------------

const parseTweets = async (tweets) => {
    let words = new Map()
    let handles=[];
    pattern = /(?! '. *')\b[\w']+\b/g //regex for word(s)
    tweets.forEach(tweet => {

        temp=tweet.text.split(' ');
        const customStopwords=['&amp;', "i'm"]
        temp=sw.removeStopwords(temp, [...sw.en, ...customStopwords])
        
        
        temp.forEach(word => {
            if(word.charAt(0)=='@'){
                handles.push(word)
                return;
                /*
                What the hell is JS. This works because every iteration 
                of the forEach loop is a function and thus 'return' 
                terminates the current iteration.
                */
            }
            word=word.toLowerCase();
            if(words.has(word)){
                words.set(word, words.get(word)+1)
            }
            else{
                words.set(word, 1)
            }
        })
    })
    
    words = Array.from(words, ([word, count]) => ({word, count}))
    words.sort(function(a, b){return b.count - a.count});
    if(words.length>130){
        words = words.slice(0, 129);
    }
    
    return {words, handles}
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
    const response = await fetch(url, defaultFetchOptions);
    const responseJson = await response.json();
    console.log("Profile request satisfied for "+profile)
    return responseJson
};
