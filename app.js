const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Rota GET para a tela de login
app.get('/', (req, res) => {
  res.render('login', { mensagem: null });
});

// Rota POST para o login
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === 'admin' && senha === '123') {
    res.redirect('/segunda');
  } else {
    res.render('login', { mensagem: 'Acesso negado' });
  }
});

// Segunda tela (extrato)
app.get('/segunda', (req, res) => {
  const caminhoArquivo = path.join(__dirname, 'extrato_bancario.json');

  fs.readFile(caminhoArquivo, 'utf8', (err, data) => {
    if (err) {
      return res.send('Erro ao ler o arquivo de extrato.');
    }

    const extrato = JSON.parse(data);
    res.render('segunda-tela', { extrato });
  });
});

// Rota de logout
app.get('/logout', (req, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
