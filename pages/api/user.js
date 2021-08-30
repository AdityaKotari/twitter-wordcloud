
export default async function handler (req, res) {
    return new Promise((resolve) => {
        const username = req.body.username
        console.log(req.body)
        if (!username) {
            res.status(400).json({error:
                "Missing username"
            })
            return resolve()
        } else {
            fetch(
                `https://api.twitter.com/2/users/by/username/${username}`,
                {
                    method: "GET",
                    headers: new Headers({
                        Authorization: "Bearer " + process.env.TWITTER_BEARER,
                    }),
                }
            )
                .then((user) => user.json())
                .then((user) => {
                    if (user.errors) {
                        res.status(404).json({ error: "User doesn't exist or couldn't be fetched."})
                        return resolve()
                    } else {
                        res.status(200).json(user)
                        return resolve()
                    }
                })
        }
        
    })
}
