const { Map } = require('immutable');

const rawSeq = Map(process.env).keySeq();
const raw = rawSeq.reduce(
  (env, key) => {
    const newEnv = Map(env).set(key, process.env[key]);
    return newEnv.toJSON();
  }, {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PUBLIC_URL: '',
  },
);

const stringifiedSeq = Map(raw).keySeq();
const stringified = stringifiedSeq.reduce(
  (env, key) => {
    const envSeq = Map(env[key]).keySeq();
    const newEnv = envSeq.reduce(prevEnv => prevEnv, JSON.stringify(raw[key]));
    return newEnv;
  }, {},
);

module.exports = {
  devServerHost: '0.0.0.0',
  devServerPort: 3355,
  stringified: {
    'process.env': stringified,
  },
};
