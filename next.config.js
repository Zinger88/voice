const isDev = 'phase-development-server'

module.exports = (phase) => {
    const reactStrictMode = false
    const images = {
        domains: ['https://avatars.githubusercontent.com'],
    }
    const env = {
        serverPath: phase === isDev ? 'http://localhost:3000' : 'https://fancy-shortbread-a95d28.netlify.app'
    }

    return {
        env,
        images,
        reactStrictMode
    }
}
