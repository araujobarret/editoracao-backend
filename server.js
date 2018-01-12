const express = require('express');
const bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Expose-Headers', 'x-auth');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-auth');
  next();
});
app.use(require('./routes/usuario'));
app.use(require('./routes/local'));
app.use(require('./routes/autor'));
app.use(require('./routes/livro'));
app.use(require('./routes/rubrica'));
app.use(require('./routes/estoque'));
app.use(require('./routes/estoqueSaida'));
app.use(require('./routes/entrada'));

app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = {app};
