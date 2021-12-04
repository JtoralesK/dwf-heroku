import *as express from"express"
const port = process.env.PORT || 3000
const app = express();

app.use(express.static("dist"))

app.get('/env', (req, res) => {
    res.send({
      enviromtent:process.env.NODE_ENV
    })
  });
  app.get('/db', (req, res) => {
    res.send({
      db:process.env.DB_HOST
    })
  });
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });