import type { AppProps } from 'next/app'

import { MainContextProvider } from '../contexts/MainContex'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MainContextProvider>
            <Component {...pageProps} />
        </MainContextProvider>
    )
}
export default MyApp
