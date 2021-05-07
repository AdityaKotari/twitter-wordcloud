const express = require('express');
const app = express()

require('dotenv').config()

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

const parsed_tweets = require('./routes/parsedTweets.js')

// Routes -------------------------------------------------

app.listen(port, () => {
    console.log('t-cloud listening at ' + port)
})

app.use('/rest/parsed', parsed_tweets)

app.get('/:profile', (req, res) => {
    res.render('index', { profile: req.params.profile });
})

app.get('/', (req, res) => {
    res.render('index', { profile: "elonmusk" });
})