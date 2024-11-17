const express = require('express'); //node.js 개발환경 완성 
const bodyParser = require('body-parser');
const app = express();
const port = process.env.Port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([
      {
        'id': 1,
        'image': 'https://placeimg.com/64/64/1',
        'name': '박진재',
        'birthday': '960530',
        'gender': '남자',
        'job': '대학생'
      },
      {
        'id': 2,
        'image': 'https://placeimg.com/64/64/2',
        'name': '김영기',
        'birthday': '950530',
        'gender': '남자',
        'job': '대학생'
      },
      {
        'id': 3,
        'image': 'https://placeimg.com/64/64/3',
        'name': '박민',
        'birthday': '940530',
        'gender': '남자',
        'job': '대학생'
      },
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

