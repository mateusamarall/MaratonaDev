const express = require('express');

const app = express();

app.use(express.static('../frontend/public'));

app.use(express.urlencoded({ extended: true }));
const { Pool } = require('pg');

const db = new Pool({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'doe',
});

const nunjucks = require('nunjucks');

nunjucks.configure('../frontend', {
  express: app,
  noCache: true,
});

app.get('/', (req, res) => {
  db.query('SELECT * FROM "donors"', (err, result) => {
    if (err) {
      return res.send('erro de banco de dados 1');
    }

    const donors = result.rows;
    return res.render('index.html', { donors });
  });
});


app.post('/', (req, res) => {
  const { name, blood, email } = req.body;
  if (name === '' || email === '' || blood === '') {
    return res.send('Todos os campos são obrigatórios');
  }
  const query = 'INSERT INTO donors("name", "blood", "email") VALUES($1, $2, $3)';
  const values = [name, blood, email];
  db.query(query, values, (err) => {
    if (err) return res.send('Por favor verifique o que foi digitado no formulário de ajuda');
    return res.redirect('/');
  });
});

app.listen(3333, () => {
  console.log('server is runnig');
});
