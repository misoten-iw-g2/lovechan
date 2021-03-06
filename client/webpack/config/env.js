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
    NOTOSANSJP_CSS: 'https://fonts.googleapis.com/earlyaccess/notosansjp.css',
    RALEWAY_CSS: 'https://fonts.googleapis.com/css?family=Raleway',
    MPLUS1P_CSS: 'https://fonts.googleapis.com/earlyaccess/mplus1p.css',
    SEMANTIC_UI_CSS: 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.13/semantic.min.css',
    BOOTSTRAP_CSS: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css',
    REACT_BOOTSTRAP_TABLE_CSS: 'https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
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
  protocol,
  devServerHost,
  devServerPort,
  raw,
  stringified,
};
