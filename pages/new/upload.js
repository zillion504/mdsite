import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react';
const Upload = () => {
	const { data: session, status } = useSession();
    const [ file, setFile ] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

		const formData = new FormData(document.getElementById("uploadForm"));

		const response = await fetch("/api/upload", {
			method: "POST",
			body: formData
		});
		const json = await response.json();

		console.log(json);
    }

    const onCancel = (e) => {
        e.preventDefault();
        setFile("");
    }

    const onFileChange = (e) => {
        setFile(e.target.value);
    }

	if (session) {
		return (
			<div className="container">
				<h1>Upload a markdown file</h1>
				<form id="uploadForm">
					<label>File:</label>
					<input onChange={onFileChange} value={file} id="file" type="file" name="file" accept=".md"></input>
					<button onClick={onSubmit} className="btn btn-primary">Upload</button>
					<button onClick={onCancel} className="btn btn-danger">Cancel</button>
				</form>
			</div>
		)
	} else {
		return <div className="container">
			<h1>Please log in!</h1>
		</div>
	}
}

export default Upload