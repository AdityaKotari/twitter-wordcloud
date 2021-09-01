import Head from "next/head"

const HeadMeta = () => {
    return (
        <Head>
            <title>Twitter Stats</title>
            <meta
                name="description"
                content="Finds the last 100 tweets of any public Twitter account and displays some stats."
            />
        </Head>
    )
}
export default HeadMeta
