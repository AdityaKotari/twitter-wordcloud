import { useEffect, useCallback } from "react"
import { render } from "react-dom"
import WordCloud from "react-d3-cloud"
import Loading from "./Loading"

const FriendsList = (props) => {
    console.log(props.friends)

    const generate_list = () => {
        let list = []
        for (let i = 0; i < Math.min(10, props.friends.length); i++) {
            list.push(
                <p key={`friend-${i+1}`}>
                    <span className="friend-text"><b>{`${i+1}.`}</b> {`${props.friends[i].text}`}</span>
                </p>
            )
        }
        return list
    }

    if (!props.friends) {
        return <Loading />
    } else {
        return <div>{generate_list()}</div>
    }
}

export default FriendsList
