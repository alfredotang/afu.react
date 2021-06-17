const prod = process.env.NODE_ENV === 'production'

console.log('-------------------------');
console.log(`\x1b[32m env:\x1b[0m ${process.env.NODE_ENV}`);
console.log(`\x1b[32m isProd:\x1b[0m ${prod}`);
console.log(`\x1b[32m isDev:\x1b[0m ${!prod}`);
console.log('-------------------------');


module.exports = {
  distDir: 'build',
  assetPrefix: prod ?  '/afu.react' : '',
  reactStrictMode: true,
  basePath: prod ?  '/afu.react' : '',
};
