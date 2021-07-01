import express from 'express';
import serveIndex from 'serve-index';

const app = express();
const port = 3000;
const publicDir = './public';

app.use((req, res, next) => {
  console.log('req.url', req.url);
  next();
});

app.use(express.static(publicDir));
app.use(serveIndex(publicDir, {icons: true}));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
