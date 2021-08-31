import { useEffect, useCallback } from "react"
import { render } from "react-dom"
import WordCloud from "react-d3-cloud"
import Loading from "./Loading"

const WordCloudDiv = (props) => {
    console.log(props.wordFreq)

    // max = 100, min = 25
    const max_freq = props.wordFreq? props.wordFreq[0].value: 50 
    const fontSize = (word) => 75*(word.value/max_freq)
    
    if(!props.wordFreq){
        return (
            <Loading/>
        )
    }
    return (
        <div id="word-cloud">
            {typeof window !== "undefined" && (
                <WordCloud
                    data={props.wordFreq.slice(0, 100)}
                    fontSize={fontSize}
                    spiral="archimedean"
                    fontWeight="bold"
                    padding = {3}
                />
            )}
        </div>
    )
}

export default WordCloudDiv
