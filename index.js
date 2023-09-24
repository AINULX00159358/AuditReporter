const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Post data ')
})

app.use(express.json())

app.post('/', (req, res) => {
   console.log("----------------------------------------");
   console.log(new Date().toISOString());
   console.log(req.headers); 
   console.log(JSON.stringify(req.body, null , 4)); 
   console.log("-----------------------------------------------");
   res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
