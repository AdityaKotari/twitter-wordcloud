
export default async function handler(req, res) {
    return new Promise((resolve) => {
        const {user_id, max_tweets }= req.body
        console.log(user_id)
        if (!user_id ) {
            res.status(400).json( {error: "Missing user_id" }  )
            return resolve()
        } else {
            fetch(
                `https://api.twitter.com/2/users/${user_id}/tweets?exclude=&max_results=${Math.min(100, max_tweets || 100)}`,
                {
                    method: "GET",
                    headers: new Headers({
                        Authorization: "Bearer " + process.env.TWITTER_BEARER,
                    }),
                }
            )
                .then((timeline) => timeline.json())
                .then((timeline) => {
                    if (!timeline || timeline.errors) {
                        console.log(timeline.errors)
                        res.status(500).json({errors: timeline.errors})
                        return resolve()
                    } else {
                        console.log(timeline.meta.result_count + " tweets fetched")
                        res.status(200).json(timeline.data)
                        return resolve()
                    }
                })
        }
        
    })
}
