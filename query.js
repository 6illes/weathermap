#!/home/gilles/.nvm/versions/node/v14.4.0/bin/node

// Gilles  CopyRight(c) 2021

const fs = require('fs')

const http = require('http')
const https = require('https')

var redis = require("redis")
var db = redis.createClient()

// --------------  EVENTS -----------------------

var events = require('events');
var exec = new events()

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

// --------------  HTTP ---------------------

var pport =  5000
var phost =  "localhost"
var query = "/interface?equipment=XX&interface=YY&inout=ZZ"


function doget(router,interface,flow,ibps) {

  var request = query.replace("XX",router).replace("YY",interface).replace("ZZ",flow)

  options = {
      host:phost,
      port: pport,
      method: "GET",
      path: request,
  }
  http.get(options,function(resp) {
    let data = '';
    resp.on('data',function(chunk) {
      data += chunk;
    });
    resp.on('end', () => {
      exec.emit('data',data,router,interface,flow,ibps)
    });
  }).on('error', (err) => {
    console.log('Error: ' + err.message);
  });
}

function doget2(link) {
   return function() {
      console.log('link',link)
      doget(link.router,link.interface,link.flow,link.ibps)
   }
}

setTimeout(function() {
   for(var i in links) {
      link = links[i]
      interval = 1*60*1000 + Math.floor(Math.random()*30*1000)
      setInterval(doget2(link),interval)
   }
},5000)

exec.on('data',function(data,router,interface,flow,ibps) {
  res = { router:router, interface:interface, flow:flow, ibps:ibps, bps:data }
  console.log('data',res)
  db.publish('interface',JSON.stringify(res))
})
