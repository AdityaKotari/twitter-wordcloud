# Twitter Wordcloud/stats
Web app that fetches the last 100 tweets from any public Twitter account and visualizes some data(for now, a wordcloud).

Uses the Twitter API v2. This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 

###### Deployed with Vercel at [https://twitter-wordcloud.vercel.app/](https://twitter-wordcloud.vercel.app/)

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
