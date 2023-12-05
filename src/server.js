

import server from './app';
import config from './config/config';

const currentConfig = config[process.env.NODE_ENV];

const { port } = currentConfig;

server.listen(port || process.env.PORT, () =>
  console.log(`App listening on ${port}!....`)
);

export default server;
