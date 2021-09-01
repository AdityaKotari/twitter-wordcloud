
import { useRouter } from "next/router"
import { useEffect, useState, useCallback } from "react"

import words from "../utility/words.js"
import sentiment from "../utility/sentiment.js"

import WordCloudDiv from "../components/WordCloudDiv.js"
import FriendsList from "../components/FriendsList.js"
import TweetSentiments from "../components/TweetSentiments.js"
import GithubLink from "../components/GithubLink.js"
import HeadMeta from "../components/HeadMeta.js"

const StatsPage = () => {
    const router = useRouter()
    const [wordFreq, setWordFreq] = useState(null)
    const [friends, setFriends] = useState(null)
    const [topSenti, setTopSenti] = useState(null)
    const username = router.query.username

    const redirect_to_user = () => {
        router.push(`https://twitter.com/${username}`)
    }

    useEffect(async () => {
        if (!username) {
            return
        }
        let user = await fetch("/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: router.query.username,
            }),
        })
        user = await user.json()
        console.log(user)
        if (user.error) {
            router.push("/?error=nouser")
        } else {
            var timeline = await fetch("/api/timeline", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: user.data.id,
                }),
            })
            timeline = await timeline.json()
            const temp = await words(timeline)
            setWordFreq(temp.words)
            setFriends(temp.friends)

            const senti = await sentiment(timeline)
            console.log(senti)
            setTopSenti(senti)
        }
    }, [username])
    return (
        <div>
            <HeadMeta />
            <p className="username" onClick={redirect_to_user}>
                @{username}
            </p>
            <hr />
            <p className="stats-headings">
                The <i>people</i> they tweet at the most often:
            </p>
            <FriendsList friends={friends}></FriendsList>
            <hr />
            <p className="stats-headings">
                The <i>words</i> they tweet most often:
            </p>
            <WordCloudDiv wordFreq={wordFreq}></WordCloudDiv>
            <hr />
            <p className="friend-text">
                The following tweets may not be categorized accurately. More
                details{" "}
                <a
                    href="Make suggestions or find the code at
https://github.com/AdityaKotari/twitter-wordcloud"
                >
                    here
                </a>
            </p>
            <hr />
            <TweetSentiments senti={topSenti}></TweetSentiments>
            <hr />
            <div className="back" onClick={() => router.push("/")}>
                Go back
            </div>
            <hr />
            <GithubLink />
        </div>
    )
}

export default StatsPage
