import { useState } from "react"

import router from "next/router"
import HeadMeta from "../components/HeadMeta"

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
            <HeadMeta/>
            <main>
                <div>
                    {
                    (typeof window !== "undefined" && router.query.error) &&(
                    <div>
                    <p className="error-alert"> That Twitter profile does not exist or is private. <br/>Try again!</p>
                    <hr></hr>
                    </div>)
                    }
                    <p className = "hellotext one">Whose Twitter</p>
                    <p className = "hellotext two">Do you want to find?</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <span className="hello-input-text">Twitter handle: &nbsp;@
                    <input className="hello-input hello-input-text"
                        
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
