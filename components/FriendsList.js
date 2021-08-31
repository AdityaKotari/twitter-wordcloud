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
                <p>
                    {/* <span className="friend-position">
                        {i + 1}&nbsp;-&nbsp;
                    </span> */}
                    <span className="friend-text">{i==0?"🏆":""}&nbsp;{`${props.friends[i].text}`}</span>{" "}
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
