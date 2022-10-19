import type { AppProps } from 'next/app'

import { MainContextProvider } from '../contexts/MainContex'
import { Header } from '../components/Header'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MainContextProvider>
            <>
                <Header />
            </>
            <Component {...pageProps} />
        </MainContextProvider>
    )
}
export default MyApp
