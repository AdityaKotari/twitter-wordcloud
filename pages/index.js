import Head from "next/head"
import { useEffect, useState } from "react"

import { TextField, Typography, InputAdornment } from "@material-ui/core"
import router from "next/router"

const Home = () => {
    const [username, setUsername] = useState("")
    

    const handleChange = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        router.push(`/stats?username=${username}`)
    }

    return (
        <div>
            <Head>
                <title>Twitter Stats</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div>
                    <p className = "hellotext one">Whose Twitter</p>
                    <p className = "hellotext two">Do you want us to find?</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <span className="hello-input-text"> {(typeof window !== "undefined" && window.innerWidth >=960)? "Twitter handle ":""}
                    <TextField
                        id="standard-basic"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">@</InputAdornment>,
                        }}
                        onChange={handleChange}
                        onPaste={handleChange}
                    />
                    </span>
                </form>
            </main>
        </div>
    )
}

export default Home