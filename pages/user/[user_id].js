import Link from 'next/link';
import React from 'react'
import database from '../../lib/database';

const User = (props) => {

	const uploadList = props.uploads.map((upload, i) => {
		return <Link key={upload.id} href={"/md/" + upload.id}><a>
			<p>{upload.file_name}</p>
		</a></Link>
	})

	return (
		<div className="container pt-5">
			<h1>{props.name}</h1>
			<p>{props.uploads.length} markdown{props.uploads.length > 1 ? "s" : ""}</p>

			{uploadList}

		</div>
	)
}

export async function getServerSideProps(context) {
	const id = context.params.user_id;

	const [rows] = await database.query("SELECT * FROM users WHERE id = ?", [id]);

	if (rows.length == 1){
		const userInfo = rows[0];
		const [uploadRows] = await database.query("SELECT * FROM uploads WHERE user_id = ? ORDER BY id DESC", [id]);


		return {
			props: {
				name: userInfo.name,
				id: id,
				uploads: uploadRows,
			}
		}
	}

	context.res.statusCode = 302;
	context.res.setHeader("Location", "/404")

	return {props: {}}
}

export default User