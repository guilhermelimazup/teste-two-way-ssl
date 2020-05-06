const fs = require('fs');
const https = require('https');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  if (!req.client.authorized) {
    return res.status(401).send('Invalid client certificate authentication.');
  }

  return res.send('Hello, world!');
});

https
  .createServer(
    {
      // ...
      requestCert: true,
      rejectUnauthorized: false,
      ca: fs.readFileSync('ca-crt.pem'),
      cert: fs.readFileSync('server-crt.pem'),
      key: fs.readFileSync('server-key.pem')
      // ...
    },
    app
  )
  .listen(9443);