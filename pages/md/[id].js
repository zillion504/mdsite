import React from 'react'
import getConfig from 'next/config';
import path from "path";
import fs from "fs";
const { serverRuntimeConfig } = getConfig();
import {marked} from "marked";
import Parser from "html-react-parser";
import database from '../../lib/database';

const MarkdownDisplay = (props) => {
	if (props.file) {
		return (
			<div className="container pt-5">
				<h1>{props.file_name}</h1>
				<p>Uploaded by {props.user_name}</p>
				<div className="textbox">
					{Parser(marked.parse(props.file))}
				</div>
			</div>
		)
	} else {
		return <div></div>
	}
}

export async function getServerSideProps(context) {
	
	const id = context.params.id;
	const filePath = path.join(serverRuntimeConfig.PROJECT_ROOT, "uploads", id + ".md");
	
	const promise = new Promise((resolve, reject) => {
		fs.readFile(filePath, "utf8", (err, data) => {
			if (err) {
				console.log("ERROR",err);
				resolve(null);
			} else {
				resolve(data);
			}
		});
	});
	const file = await promise;

	if (file) {

		const [rows] = await database.execute("SELECT * FROM uploads WHERE id = ?", [id]);

		const fileInfo = rows[0];

		const [rows2] = await database.execute("SELECT * FROM users WHERE id = ?", [fileInfo.user_id]);
		const userInfo = rows2[0];

		console.log(userInfo.name);
		
		return {
			props: {
				file,
				user_id: fileInfo.user_id,
				file_name: fileInfo.file_name,
				user_name: userInfo.name,
			}
		}
	} else {
		context.res.statusCode = 302
		context.res.setHeader("Location", "/404");
		return {
			props: {}
		}
	}
}

export default MarkdownDisplay