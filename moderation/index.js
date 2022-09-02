const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { application } = require('express');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  console.log('type', type);

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'reject' : 'approved';
    console.log('status');

    await axios.post('http://event-bus-service:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        content: data.content,
        status,
        postId: data.postId,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});
