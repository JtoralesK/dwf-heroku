import *as express from"express"
const port = process.env.PORT || 3000
const app = express();


app.get('/', (req, res) => {
    res.send('Hello World!, how are you?, i am javi')
  });
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });