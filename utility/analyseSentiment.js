const SW = require("stopword")
const natural = require("natural")
const { SentimentAnalyzer, PorterStemmer } = natural
const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn")

const { WordTokenizer } = natural
const tokenizer = new WordTokenizer()

const SpellCorrector = require("spelling-corrector")
const spellCorrector = new SpellCorrector()
spellCorrector.loadDictionary()

const aposToLexForm = require("apos-to-lex-form")

const analyse_sentiment = async (tweets) => {
    const out = []
    try {
        for (i = 0; i < tweets.length; i++) {
            /*
        Something in here is messing up words with '/' between them. 
        Ex. 'skill/knowledge' becomes 'skillknowledge'
        */
            const lexedTweet = aposToLexForm(tweets[i].text)
            const alphaOnlyTweet = lexedTweet.replace(/[^a-zA-Z\s]+/g, "")
            const casedTweet = alphaOnlyTweet.toLowerCase()

            const tokenizedTweet = tokenizer.tokenize(casedTweet)

            tokenizedTweet.forEach((word, index) => {
                tokenizedTweet[index] = spellCorrector.correct(word)
            })

            const filteredTweet = SW.removeStopwords(tokenizedTweet)

            out.push({
                tweet: tweets[i].text,
                sentiment: analyzer.getSentiment(filteredTweet),
            })
        }
        return out
    } catch (error) {
        console.log(error)
    }
}

module.exports = analyse_sentiment
