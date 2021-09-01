import Loading from "./Loading"

const TweetSentiments = (props) => {
    const generateTweetList = (li, isPositive) => {
        var tweets = []
        var i = 0
        li.forEach((tweet) => {
            tweets.push(
                <div key={`${i}-${isPositive}-quoted-tweet`}>
                    <p
                        className={`quoted-tweets ${
                            isPositive ? "positive" : "toxic"
                        }`}
                    >{`"${tweet.text}"`}</p>
                    {i++ < li.length - 1 ? (
                        <hr className="short-line"></hr>
                    ) : null}
                </div>
            )
        })
        return tweets
    }

    if (!props.senti) {
        return <Loading />
    } else {
        return (
            <div>
                <p className="stats-headings">
                    Their most recent <i>positive</i> tweets:
                </p>
                {generateTweetList(props.senti.positive, true)}
                <hr />
                <p className="stats-headings">
                    Their most recent <i>negative</i> tweets:
                </p>
                {generateTweetList(props.senti.toxic, false)}
            </div>
        )
    }
}
export default TweetSentiments
