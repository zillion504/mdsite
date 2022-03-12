import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import database from '../lib/database'

export default function Home(props) {
	const uploadList = props.uploads.map((upload, i) => {
		return <Link key={upload.id} href={"/md/" + upload.id}><a>
			<p>{upload.file_name} by {upload.name}</p>
			
		</a></Link>
	})

	return <div className="container mt-5">
		<h1>Recently uploaded</h1>
		<div>
			{uploadList}
		</div>
	</div>
}

export async function getServerSideProps(context) {
	const [rows] = await database.query(
		`SELECT uploads.id, uploads.file_name, users.name FROM uploads
		LEFT JOIN users on uploads.user_id = users.id
		ORDER BY id DESC LIMIT 20`);

	return {
		props: {
			uploads: rows
		}
	}
}