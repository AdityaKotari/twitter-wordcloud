# twitter-wordcloud

 A nodejs web app that makes a word cloud using the tweets of a specified profile. 
 
* Demo hosted [here](https://twitter-wcloud.glitch.me/).

* Can pull upto 200 recent tweets from a specified user using the Twitter API's 
[GET statuses / user_timeline](https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-user_timeline) endpoint. 

* Uses [amchart](https://www.amcharts.com/)'s library(with good documentation) to generate a word-cloud. Displays the top 200 most frequent words.

Starts off at Elon Musk's twitter as an example, but should work for any public twitter account. 
Needs Twitter dev OAuth keys to run.

