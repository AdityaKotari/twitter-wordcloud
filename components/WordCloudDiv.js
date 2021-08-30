import { useEffect, useCallback } from "react"
import { render } from "react-dom"
import WordCloud from "react-d3-cloud"

const WordCloudDiv = (props) => {
    console.log(props.wordFreq)
    const fontSize = useCallback((word) => word.value * 5)
    return (
        <div id="word-cloud">
            {typeof window !== "undefined" && (
                <WordCloud
                    data={props.wordFreq.slice(0, 50)}
                    fontSize={fontSize}
                    spiral="archimedean"
                    fontWeight="bold"
                    fontFamily="'Times New Roman', serif"
                />
            )}
        </div>
    )
}

export default WordCloudDiv
