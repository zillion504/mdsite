import 'bootstrap/dist/css/bootstrap.css'
import '../styles/style.css'
import Link from 'next/link'
import {useEffect} from "react"
import {SessionProvider} from "next-auth/react"
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	useEffect(() => {
        typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
    }, []);
	return <>
		<SessionProvider session={session}>
			<NavBar/>
			<Component {...pageProps} />
			<Footer/>
		</SessionProvider>
	</>
}

export default MyApp
