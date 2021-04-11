const express = require('express');
const app = express()

require('dotenv').config()

const { MongoClient } = require("mongodb");

const SW = require('stopword')

const fetch = require("node-fetch");
const port = process.env.PORT || 3000 ;
//const port = process.env.PORT;

const natural = require('natural');
const { SentimentAnalyzer, PorterStemmer } = natural;
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
const { WordTokenizer } = natural;
const tokenizer = new WordTokenizer();

const SpellCorrector = require('spelling-corrector');
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

const aposToLexForm = require('apos-to-lex-form');

app.set('view engine', 'ejs');




//---------Routes-----------------------

app.get('/:profile', (req, res) => {
    res.render('profile', { profile: req.params.profile });
})

app.listen(port, () => {
    console.log(`Example app listening at ` + port)
})

app.get('/', (req, res) => {
    res.render('profile', { profile: "elonmusk" });
})

app.get('/rest/profile/:profile', async (req, res) => {
    //console.log('one sec, gotta do work')
    var tweets = await getTweetsFromAPI(req.params.profile, 1);
    for (i = 1; i <= 15; i++) {
        tweets2 = await getTweetsFromAPI(req.params.profile, 1 + i);
        if(!tweets2){
            break;
        }
        tweets = tweets.concat(tweets2);
    }

    tweets = await parseTweets(tweets);
    
    
    try {
        res.json(tweets);
    } catch (error) {
        console.log(error);
    }
})

app.get('/rest/analysis/:profile', async (req, res) => {
    let tweets = await getTweetsFromAPI(req.params.profile, 1);
    if(tweets.length>5){
        tweets = tweets.slice(0, 5);
    }
    const analysedTweets = await analyseTweets(tweets);
    res.json(analysedTweets);
})

//---------Funcs--------------------------------------
const analyseTweets = async (tweets) => {
    
    for(i=0; i<tweets.length; i++){
        const lexedTweet = aposToLexForm(tweets[i].text);
        const casedTweet = lexedTweet.toLowerCase();
        const alphaOnlyTweet = casedTweet.replace(/[^a-zA-Z\s]+/g, '');
        const tokenizedTweet = tokenizer.tokenize(alphaOnlyTweet);

        tokenizedTweet.forEach((word, index) => {
            tokenizedTweet[index] = spellCorrector.correct(word);
        })

        const filteredTweet = SW.removeStopwords(tokenizedTweet);
        const analysis = analyzer.getSentiment(filteredTweet)
        
        tweets[i].analysis=analysis;
        console.log(analysis)
    }

    return tweets;
}

const parseTweets = async (tweets) => {
    let words = new Map()
    let handles = [];

    
    tweets.forEach(tweet => {
        
        //the simple counting part
        temp = tweet.text.split(' ');
        const customStopwords=['&amp;', "i'm", "rt", ]
        temp=SW.removeStopwords(temp, [...SW.en, ...customStopwords])

        temp.forEach(word => {
            if (word.charAt(0) == '@') {
                handles.push(word)
                return;
                /*
                What the hell is JS. This works because every iteration 
                of the forEach loop is a function and thus 'return' 
                terminates the current iteration.
                */
            }
            word = word.toLowerCase();
            if (words.has(word)) {
                words.set(word, words.get(word) + 1)
            }
            else {
                words.set(word, 1)
            }
        })
    })

    words = Array.from(words, ([word, count]) => ({ word, count }))

    words.sort(function (a, b) { return b.count - a.count });

    console.log("Profile request satisfied, " + words.length + " found.")
    if (words.length > 250) {
        words = words.slice(0, 249);
    }

    return { words, handles }
}

//---------Making GET requests to twitter---------------------

//you need a bearer code from your twitter dev account here
bearer = process.env.twitterBearer;

const defaultFetchOptions = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ` + bearer,
    },
};

const getTweetsFromAPI = async (profile, pageNum) => {
    url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + profile + '&count=200&page=' + pageNum;
    const response = await fetch(url, defaultFetchOptions);
    const responseJson = await response.json();
    return responseJson;
};

//------------ db stuff ----------------------------------------
/*
const url = process.env.mongodb;
const client = new MongoClient(url);

const dbSetUp = async () => {
    await client.connect();
    console.log("Connected correctly to ATLAS server");
    viewsCollection = client.db.collection("views");

}
dbSetUp();

const searchedFor = async (profile) => {
    
    try {
        db = client.db("frequentwords");
        const findResult = await idkCollection.findOne({
            name: profile
          });
        return findResult;
    }
    catch(e){
        console.log(e);
    }
};

const addIntoCache = async (profile, tweets) =>{
    let Document = {
        "name": profile,
        "words": JSON.stringify(tweets)
    };
    try{
        db = client.db("frequentwords");
        await idkCollection.insertOne(Document);
    }
    catch(e){
        console.log(e);
    }
    
};
*/