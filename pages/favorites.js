import { getSession } from "next-auth/react"

export default function Favorites({session}) {
    console.log(session)
    return <div className="container">
        {"Test"}
    </div>
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    console.log("test", session)
    return {
        props: {
            session: session
        }
    }
}