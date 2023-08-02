/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  serverRuntimeConfig:{
    myPort : process.env.PORT || 3030
  },
  output: 'standalone'
}

module.exports = nextConfig
