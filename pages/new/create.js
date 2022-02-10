import { useSession } from "next-auth/react"

export default function New() {
    const {data: session, status } = useSession();
    let username = "Not logged in!"
    if (session) 
        username = session.user.email
    console.log(session);

    const onSubmit = async () => {
        let res = await fetch(`/api/test`);
        res = await res.json();
        console.log(res);
    }

    return <div className="container pt-5">
        <h1>Submit a new markdown</h1>
        <p>Submitting as: {username}</p>
        <textarea className="md-editor">

        </textarea>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <select>
                <option>General</option>
                <option>Blah</option>
            </select>
            <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
        </div>
    </div>
}