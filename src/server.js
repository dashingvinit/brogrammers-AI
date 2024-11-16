const express = require('express');
const compression = require('compression');
const router = require('./routes/index');
const cors = require('cors');
const { serverConfig, database } = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'https://brogrammers.in',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(
  compression({
    level: 6,
    threshold: 10 * 100,
  })
);

app.get('/', (req, res) => res.send('Brogrammers-AI Backend'));

app.use('/api', router);

app.listen(serverConfig.PORT, async () => {
  console.log(`Server listening on port : ${serverConfig.PORT}`);
  database.connect();
  console.log('mongoose connected');
});
