const express = require('express'); //node.js 개발환경 완성 
const bodyParser = require('body-parser');
const app = express();
const port = process.env.Port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/hello', (req, res) => {
  res.send({message: 'Hello Express!'});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
