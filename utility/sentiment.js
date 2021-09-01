import Sentiment from "sentiment"

const words = async (timeline) => {
    var sentiment = new Sentiment()
    var analysedTweets = []

    timeline.forEach((tweet) => {
        analysedTweets.push({
            text: tweet.text,
            comparative: sentiment.analyze(tweet.text).comparative,
        })
    })

    analysedTweets.sort((a, b) => {
        return a.comparative - b.comparative
    })
    
    return {
        toxic: analysedTweets.slice(0, 5),
        positive: analysedTweets.slice(analysedTweets.length - 5),
    }
}

export default words
