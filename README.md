# Twitter Wordcloud/stats


###### Deployed with Vercel at [https://twitter-wordcloud.vercel.app/](https://twitter-wordcloud.vercel.app/)

Web app that fetches the last 100 tweets from any public Twitter account and displays:
- 10 most referenced profiles
- A word cloud (using the frequency of tokens from all the tweets)
- 5 positive and 5 negative tweets found using sentiment analysis

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Uses the Twitter APIv2 to fetch tweets. 

The sentiment analysis was done using [sentiment](https://www.npmjs.com/package/sentiment). The package was picked for its performance and uses AFINN directly(and may not be very accurate). More details on how it works on its [homepage](https://github.com/thisandagain/sentiment#how-it-works).


## Running it locally:
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

Requires a Twitter developer API key for the environment variable _TWITTER_BEARER_.
