import Link from 'next/link'
import {useEffect} from "next"
import {signIn, signOut, useSession} from "next-auth/react"

export default function NavBar() {
	const { data: session } = useSession();
	return <div className="container-fluid bg-dark pt-5 pb-1">
		<div className="container" style={{display: "flex", justifyContent: "space-between"}}>
			<nav className="nav">
				<Link href="/">
					<a className="nav-link">Home</a>
				</Link>
				<Link href="/new">
					<a className="btn btn-primary">New Markdown</a>
				</Link>
			</nav>
			<nav className="nav">
				{session && <>
					<Link href="/myaccount">
						<a className="nav-link">My Account</a>
						
					</Link>

					<Link href="/myaccount">
						{/*eslint-disable-next-line @next/next/no-img-element*/}
						<a><img alt="account image" src={session.user.image} width="40px" style={{borderRadius:1000,marginRight: "10px"}} /></a>
					</Link>
					<button className="btn btn-danger" onClick={() => signOut()}>Sign Out</button>
				</>}
				{!session && (<a className="btn btn-primary" onClick={() => signIn()}>Sign In</a>)}
			</nav>
		</div>
	</div>;
}