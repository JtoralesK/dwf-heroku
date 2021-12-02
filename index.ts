import *as express from"express"
const port = process.env.PORT || 3000
const app = express();

console.log(process.env.NODE_ENV);

app.get('/', (req, res) => {
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