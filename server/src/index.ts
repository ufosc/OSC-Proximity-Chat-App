import express from 'express';
import { getMessages } from './actions/getMessages'

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/messages', (req, res) => {
    // get messages from fb
    getMessages()
    res.send("messages path")
})

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`);
});

