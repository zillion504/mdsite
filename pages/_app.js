import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'
import {useEffect} from "react"
import {SessionProvider} from "next-auth/react"
import NavBar from '../components/NavBar'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	useEffect(() => {
        typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
    }, []);
	return <>
		<SessionProvider session={session}>
			<NavBar/>
			<Component {...pageProps} />
		</SessionProvider>
	</>
}

export default MyApp
