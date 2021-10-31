const express = require('express')
const bodyparser = require('body-parser')

const router = express.Router();

var jsonParser = bodyparser.json()

const crawl = require('../utils/crawlBfs');

// router.get('/:urlString/:maxDepth/:maxLinks', ( (req, res) => {
//   console.log(JSON.stringify(req.params.maxDepth))
//   console.log(JSON.stringify(req.params.maxLinks))
//   console.log(JSON.stringify(req.params.urlString))
//   res.send('we are on crawler')
// }))

router.post('/', jsonParser, (req, res) => {
  console.log(JSON.stringify(req.body))

  // req.setTimeout(0);
  let {url, maxDepth, maxLinks} = req.body;

  crawl(url, maxDepth, maxLinks).then((result) =>{
    res.send(result);
  })
    .catch(err => res.send(err).status(404));

});




module.exports = router;
