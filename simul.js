#!/home/gilles/.nvm/versions/node/v14.4.0/bin/node

const fs = require('fs')

var http = require('http')

var express = require('express')

// --------------  READLINE ---------------------

var readline = require('readline');

var finterface = readline.createInterface({
  input: fs.createReadStream('./public/net.txt')
});

var links = {}

finterface.on('line', function (line) {
  if(line[0]=='#') return
  link = line.split(' ')
  link = { router:link[0], interface:link[1], flow:link[2], ibps:link[3] }
  fqlink = link.router+':'+link.interface+':'+link.flow
  links[fqlink] = link
})

// --------------  EXPRESS ----------------------

var app = express()
var server = http.createServer(app)

var host = 'localhost'
var port = 5000

// "/interface?equipment=XX&inout=YY&interface=ZZ"

app.get('/interface',function(req,res) {
  router    = req.query['equipment']
  interface = req.query['interface']
  flow      = req.query['inout']
  console.log('interface',router,interface,flow)
  fqlink = router+':'+interface+':'+flow
  link = links[fqlink]
  if(!link) return res.end()
  lbps = Math.round(Math.random()*link.ibps)
  res.end(''+lbps)
})
server.listen(port,host,function() {
  console.log('listening on',host,port)
})
