import { useSession } from "next-auth/react"
import { useState } from "react";
import Parser from "html-react-parser";
import {marked} from "marked";
import Router from "next/router";

export default function New() {
    const {data: session, status } = useSession();
	const [ text, setText ] = useState("");

    let username = "Not logged in!"
    if (session) 
        username = session.user.email
    console.log(session);

    const onSubmit = async () => {
		const file = new Blob([text], {type: "text/plain"});
		
		let fileName = document.getElementById("name").value
		if (fileName === "") {
			fileName = "Untitled markdown file";
		}

		fileName += ".md"

		const formData = new FormData()
		formData.append("file", file, fileName);

		const response = await fetch("/api/upload", {
			method: "POST",
			body: formData
		});
		const json = await response.json();
		console.log(json);
		Router.push("/md/" + json.id)
    }

	const onChange = (e) => {
		setText(e.target.value);
	}

	const onCancel = () => {
        Router.push("/")
	}

    return <div className="container pt-5">
        <h1>Submit a new markdown</h1>
        <p>Submitting as: {username}</p>
		<input id="name" type="text" placeholder="Untitled markdown file"></input>
		<div className="grid-col-2">
			<div>
				Enter your markdown:
				<textarea onChange={onChange} className="textbox md-editor">

				</textarea>
			</div>
			<div>
				Preview:
				<div className="textbox" style={{minHeight: "50%"}}>
					{Parser(marked.parse(text || ""))}
				</div>
			</div>
		</div>
        <div style={{display: "flex", justifyContent: "right"}}>
            <select style={{minWidth: "150px"}}>
                <option>General</option>
                <option>Blah</option>
            </select>
			<button className="btn btn-primary" onClick={onSubmit} style={{marginLeft: "5px"}} >Submit</button>
			<button className="btn btn-danger" onClick={onCancel} style={{marginLeft: "5px"}}>Cancel</button>
        </div>
    </div>

}