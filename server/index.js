require('newrelic');
const express = require('express');
const cors = require('cors');
const router = require('./routes/route.js');

const app = express();
const PORT = 80;
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/products', router);
app.get('/loaderio-b5dbc8ec0886d06fe1feba03b86448c3', (req, res) => {
  res.status(200).send('loaderio-b5dbc8ec0886d06fe1feba03b86448c3');
});

// eslint-disable-next-line no-console
// app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
