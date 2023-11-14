import app from './app';

const port = 3000;

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`);
});
