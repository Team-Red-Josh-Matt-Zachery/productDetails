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
app.get('/loaderio-8802544ae101ddcc30913b30348c052a', (req, res) => {
  res.status(200).send('loaderio-8802544ae101ddcc30913b30348c052a');
});

// eslint-disable-next-line no-console
// app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
