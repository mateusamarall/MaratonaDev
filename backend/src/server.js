const express = require('express');

const app = express();

app.use(express.static('../frontend/public'));

const nunjucks = require('nunjucks');

nunjucks.configure('../frontend', {
  express: app,
  noCache: true,
});

const donors = [
  {
    name: 'Mateus',
    blood: 'AB+',
  },
  {
    name: 'Geisa',
    blood: 'B+',
  },
  {
    name: 'Cleiton',
    blood: 'A+',
  },
  {
    name: 'Erick',
    blood: 'O+',
  },
];
app.get('/', (req, res) => res.render('index.html', { donors }));

app.listen(3333, () => {
  console.log('server is runnig');
});
