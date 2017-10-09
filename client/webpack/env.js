const { Map } = require('immutable');

delete require.cache[require.resolve('./paths')];

const devServerHost = '0.0.0.0';
const devServerPort = '3355';

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

const rawSeq = Map(process.env).keySeq();
const raw = rawSeq.reduce(
  (env, key) => {
    const newEnv = Map(env).set(key, process.env[key]);
    return newEnv.toJSON();
  }, {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PUBLIC_URL: process.env.PUBLIC_URL || `${protocol}://${devServerHost}:${devServerPort}`,
  },
);

const stringifiedSeq = Map(raw).keySeq();
const stringified = {
  'process.env': stringifiedSeq.reduce(
    (env, key) => {
      const newEnv = Map(env).set(key, JSON.stringify(raw[key]));
      return newEnv.toJSON();
    }, {},
  ),
};

module.exports = {
  devServerHost,
  devServerPort,
  raw,
  stringified,
};
