import type { AppProps } from 'next/app'

import { AuthContextProvider } from '../contexts/AuthContext'
import { Header } from '../components/Header'
import '../styles/globals.scss'


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthContextProvider>
            <>
                <Header />
            </>
            <Component {...pageProps} />
        </AuthContextProvider>
    )
}
export default MyApp
