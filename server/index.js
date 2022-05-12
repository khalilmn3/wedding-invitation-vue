const express = require('express')
const db = require('./utils/db_config.js')
const app = express()
const port = 97898

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//INSERT
function insertGuestbook(req) { 
  const insert = `INSERT INTO guest_book (name, messages) VALUES ("${req.body.name}", "${req.body.message}")`;
  db.query(insert, function (err, result) { 
    if (err) throw err;
  }); 
}
app.post('/guestbook', (req, res) => {
  insertGuestbook(req);
  res.send(req.body);
})



app.get('/guestbook', (req, res) => {
  const guestbook = 'SELECT * FROM guest_book ORDER BY create_at DESC;';
  let guestbookList;
//LIST
  db.query(guestbook, function (err, result) { 
    if (err) throw err;
      res.send(result);
    });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})