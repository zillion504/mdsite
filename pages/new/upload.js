import React from 'react'
import { useState } from 'react'

const upload = () => {
    const [ file, setFile ] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

    }

    const onCancel = (e) => {
        e.preventDefault();
        setFile("");
        console.log("Clicked cancel");
    }

    const onFileChange = (e) => {
        console.log("File changed");
        setFile(e.target.value);
    }


    return (
        <div className="container">
            <h1>Upload a markdown file</h1>
            <form>
                <label>File:</label>
                <input onChange={onFileChange} value={file} id="file" type="file" name="file"></input>
                <button onClick={onSubmit} className="btn btn-primary">Upload</button>
                <button onClick={onCancel} className="btn btn-danger">Cancel</button>
            </form>
        </div>
      )
}

export default upload