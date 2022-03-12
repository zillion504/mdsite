import { getSession } from 'next-auth/react'
import React from 'react'
import database from '../lib/database';

// Simply redirects to the /user/[id] page of the user

const MyAccount = () => {
  return (
    <div></div>
  )
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	

	if (session) {
		const [rows] = await database.query("SELECT * FROM users WHERE email = ?", [session.user.email]);

		if (rows.length == 1) {
			const userInfo = rows[0];
			context.res.statusCode = 302
			context.res.setHeader("Location", "/user/" + userInfo.id)

			return { props: {} }
		}
	}
	context.res.statusCode = 302
	context.res.setHeader("Location", "/")
	return { props: {} }
}

export default MyAccount