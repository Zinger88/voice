import type { AppProps } from 'next/app'

import { Header } from '../components/Header'
import { ProtectRoute } from '../components/ProtectRoute'
import { AuthContextProvider } from '../contexts/AuthContext'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthContextProvider>
            <ProtectRoute>
                <Header />
                <Component {...pageProps} />
            </ProtectRoute>
        </AuthContextProvider>
    )
}
export default MyApp
