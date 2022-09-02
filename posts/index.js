const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = { id, title };
  console.log('posts', posts);
  await axios
    .post('http://event-bus-service:4005/events', {
      type: 'PostCreated',
      data: {
        id,
        title,
      },
    })
    .catch((err) => console.log(err));

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Recieved Event', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('Listeing on 4000');
});
