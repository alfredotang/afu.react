
const dayjs = require('dayjs');

const env =  process.env.NODE_ENV || 'dev';

module.exports = {
  distDir: 'build',
  assetPrefix: env === 'dev' ? '' : '/afu.react',
  reactStrictMode: true,
  generateBuildId: async () => {
    return `0.1.0-${dayjs().format('YYYY/MM/DD-HH:mm')}`;
  },
  basePath: env === 'dev' ? '' : '/afu.react',
};
