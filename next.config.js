const isProd = process.env.NODE_ENV === 'prod'

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isProd ? '/afu.react' : '',
  reactStrictMode: true,
  basePath: isProd ? '/afu.react' : '',
  swcMinify: true,
}

module.exports = nextConfig
