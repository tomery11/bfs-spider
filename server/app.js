const express = require('express')
const cors = require('cors');
const app = express();

// import routes
const crawlRoute = require('./routes/crawl.js')



app.use(cors({
  origin : "http://localhost:4200"
}))

app.use('/crawl',crawlRoute)


app.listen(8080);

//routes
app.get('/', ((req, res) => {
  res.send('we are on home')
}))

// app.get('/crawl', ((req, res) => {
//   res.send('we are on crawl')
// }))

