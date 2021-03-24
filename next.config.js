//@ts-check
const dayjs = require('dayjs');
module.exports = {
  distDir: 'build',
  assetPrefix: '/',
  reactStrictMode: true,
  generateBuildId: async () => {
    return `0.1.0-${dayjs().format('YYYY/MM/DD-HH:mm')}`;
  },
};
