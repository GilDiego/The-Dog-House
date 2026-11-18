const app = require('./src/app');
const { conn } = require('./src/db');
const { port } = require('./src/config');

conn.sync({ force: false }).then(() => {
  app.listen(port, () => console.log(`API listening on port ${port}`));
});
