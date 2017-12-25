const http = require('http');
const fs = require('fs');


const requestHandler = function(req,res){
  let clientsData = '';
  let file = '.'+req.url;
  clientsData = fs.readFileSync(file,'utf-8');
  console.log('-------------------------');
  console.log(req);
  if (req.url.endsWith('css')){
    res.setHeader('Content-Type','text/css')
  }
  res.write(clientsData);
  res.end();
}
const server = http.createServer(requestHandler);
server.listen(1111)
