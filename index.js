//index.js
const express = require('express')
const cors = require('cors')
const connection = require("./db.js");

const app = express();
app.use(cors())

const port = process.env.PORT || 8082;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

app.get("/messages", (req, res) => {
    connection.query("SELECT * FROM music", (err, results) => {
      if (err) {
          console.log(err);
          return res.send(err);
      }
  
      return res.json({
        messages: results,
      });
    });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});