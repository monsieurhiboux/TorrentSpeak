let express = require('express')
let app = express()

app.get('/', (request, response) =>{
  response.send('Hello World!')
})

app.listen(3000, () =>{
  console.log('Example app listening on port 3000!')
})
