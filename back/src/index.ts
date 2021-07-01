import express from 'express';

const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log('req.url', req.url);
  next();
});

app.use(express.static('.'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
