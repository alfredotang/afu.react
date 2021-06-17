const prod = process.env.NODE_ENV === 'production'

console.log({env: process.env.NODE_ENV})

module.exports = {
  distDir: 'build',
  assetPrefix: prod ?  '/afu.react' : '',
  reactStrictMode: true,
  basePath: prod ?  '/afu.react' : '',
};
