const express = require('express')
const fs = require('fs');
var http = require('http');
var https = require('https');
const db = require('./utils/db_config.js')
 
const credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/antar-undangan.online/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/antar-undangan.online/fullchain.pem')
};

const app = express()
const port = 63343
const httpsServer = https.createServer(credentials, app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://antar-undangan.online');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
httpsServer.listen(port, () => console.log('Server Running at port: '+port));