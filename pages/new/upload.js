import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import Parser from "html-react-parser";
import {marked} from "marked";
import Router from 'next/router';


const Upload = () => {
	const { data: session, status } = useSession();
    const [ file, setFile ] = useState("");
	const [ fileContents, setFileContents ] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault();

		const formData = new FormData(document.getElementById("uploadForm"));

		const response = await fetch("/api/upload", {
			method: "POST",
			body: formData
		});
		const json = await response.json();
		console.log(json);
		Router.push("/md/" + json.id)
    }

    const onCancel = (e) => {
        e.preventDefault();
        Router.push("/")
    }

    const onFileChange = (e) => {
        setFile(e.target.value);
		
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsText(file);

		reader.addEventListener("load", () => {

			setFileContents(reader.result);
		}, false);

    }

	if (session) {
		return (
			<div className="container pt-5">
				<h1>Upload a markdown file</h1>
				<div >
					<form id="uploadForm">
						<div style={{display: "flex", justifyContent: "space-between"}}>
							<div>
								<label>File:</label>
								<input onChange={onFileChange} value={file} id="file" type="file" name="file" accept=".md"></input>
							</div>
							<div>
								<button onClick={onSubmit} className="btn btn-primary">Upload</button>
								<button onClick={onCancel} className="btn btn-danger">Cancel</button>
							</div>
						</div>
					</form>
				</div>
				<div>
					<h3>File preview: </h3>
					<div className="textbox">
						{fileContents != "" ? Parser(marked.parse(fileContents)) : "Nothing yet!" }
					</div>
				</div>
			</div>
		)
	} else {
		return <div className="container">
			<h1>Please log in to upload!</h1>
			<a className="btn btn-primary" onClick={() => signIn()}>Sign In</a>
		</div>
	}
}

export default Upload