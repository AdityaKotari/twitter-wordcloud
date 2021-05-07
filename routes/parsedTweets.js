var express = require("express")

const fetch_tweets = require("../utility/fetchTweets")
const analyse_sentiment = require("../utility/analyseSentiment")

const SW = require('stopword')
const customStopwords=['&amp;', "i'm", "rt", "its", "will", "so", "just", "so"]

var router = express.Router()

router.get("/freq/:handle", async (req, res) => {
    const tweets = await fetch_tweets(req.params.handle, 100)

    let words = new Map()
    //loop does word freq count
    
    tweets.data.forEach((tweet) => {
        let text = tweet.text.split(" ")
        
        text=SW.removeStopwords(text, [...SW.en, ...customStopwords])

        text.forEach((word) => {
            if(word.charAt(0) === "@"){
                return
                //each iteration is a function in JS, so this works as a sort of "continue" statement.
            }
            word.toLowerCase()
            if (words.has(word)) {
                words.set(word, words.get(word) + 1)
            } else {
                words.set(word, 1)
            }
        })
    })

    words = Array.from(words, ([word, count]) => ({ word, count }))
    words.sort((a, b) => {
        return b.count - a.count
    })

    console.log(
        "Profile word freq request satisfied, " +
            words.length +
            " found, for handle " +
            req.params.handle
    )
    if (words.length > 200) {
        words = words.slice(0, 200)
    }

    res.send({ words })
})

router.get("/sentiment/:handle", async (req, res) => {
    const tweets = await fetch_tweets(req.params.handle, 10)
    const analysis = await analyse_sentiment(tweets.data.slice(0, 10))
    console.log(
        "Sentiment analysis done on " +
            analysis.length +
            " tweets for handle " +
            req.params.handle
    )
    res.send(analysis)
})

module.exports = router
