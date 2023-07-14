/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['gogocdn.net']
    },
    experimental:{
        serverActions:true
    }
}

module.exports = nextConfig
