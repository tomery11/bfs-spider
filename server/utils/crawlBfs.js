

const puppeteer = require('puppeteer')

const crawl = async (url, maxDepth, maxLinks) => {

  // console.log('maxLinks: ' + maxLinks)


  // visitd nodes
  const visited = [url]
  const myQueue = [{url: visited[0], path:'', depth:0}]
  const data = []
  let sumLinks = 0;
  let stopRun = false
  // let sumLinks = 0;


  while(myQueue.length > 0){
    let{url, path, depth} = myQueue[0]
    myQueue.shift()
    // console.log(data.length)

    //make sure we stand with limits
    if (depth < maxDepth && data.length < maxLinks){
      try {

        //creates a browser
        const browser = await puppeteer.launch();
        const [page] = await browser.pages();
        // navigates to page
        try {
          await page.goto(url + path, {waitUntil: 'load', timeout: 0})

        }catch (err){
          // throw new Error("page not found")
          return err
          // console.error(err);
        }

        let links = await page.evaluate(
          () => Array.from(
            document.querySelectorAll('a[href]'),
            a=> a.getAttribute('href')
          )
        );
        if (sumLinks + links.length < maxLinks){
          sumLinks = sumLinks + links.length
        }else{
            links = links.slice(0,maxLinks - sumLinks)
            stopRun = true
        }


        const title = await page.title();

        // sumLinks = sumLinks + links.length
        data.push({
          title: title,
          depth: depth,
          url: url.toString(),
          links: [... new Set(links)]
        });


        //close browser
        await browser.close();
        if (stopRun){
          return data
        }

        links.forEach((link) => {
          if(!visited.includes(link)){
            visited.unshift(link)
            //if not a url within the current domain
            if (link.startsWith('http')){
              myQueue.push({url: link, path: '', depth: depth + 1})
            }
            // if url belongs to current domain
            else{
              myQueue.push({url: url, path: link, depth: depth + 1})
            }
          }
        })

      }catch (err){
        console.log(err)
        throw err
      }
    }else {
      return data;
    }
  }
};


module.exports = crawl;
