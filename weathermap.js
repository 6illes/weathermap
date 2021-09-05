#!/home/gilles/.nvm/versions/node/v14.4.0/bin/node

const fs = require('fs')

const http = require('http')
const https = require('https')

var express = require('express')
var socketio = require('socket.io')

var redis = require("redis")
var db = redis.createClient()

// --------------  EXPRESS ----------------------

var app = express()
var server = http.createServer(app)
var io = socketio(server)

var host = 'localhost'
var port = 4000

var handlebars = require("express-handlebars")
app.engine('hbs',handlebars({extname:'.hbs'}))
app.set('view engine','hbs')

app.use('/public' ,express.static('public'));

app.get('/ed',function(req,res,next) {
  res.render('mapsedit.hbs')
})
app.get('/',function(req,res,next) {
  res.render('maps.hbs')
})
server.listen(port,host,function() {
  console.log('listening on',host,port)
})

// --------------------------------------------------

function setmap(fname) {
  return function() {
    date = new Date().getTime()
    console.log('setmap',date)
    fs.copyFileSync(fname,fname+'-'+date)
  }
}
function getmap(socket,fname) {
  return function() {
    fs.readFile(fname,function(err, data) {
      if(err) throw(err)
      socket.emit('getmap',data.toString())
    })
  }
}

// --------------------------------------------------

dir = '/home/gilles/DEV/cytoscape3'

console.log('connection')
io.on('connection',function (socket) {
  console.log('connected')

  socket.on('disconnect', function () {
    console.log('disconnect')
  })

  socket.on('getmap',function(map) {
    fname = dir+'/maps/map-'+map
    console.log('getmap',fname)
    if(!fs.existsSync(fname)) return
    setTimeout(getmap(socket,fname),1)
  })

  socket.on('setmap',function(map,smap) {
    fname = dir+'/maps/map-'+map
    console.log('setmap',fname)
    fs.writeFile(fname,smap,function(err) {
      if(err) throw(err)
      setTimeout(setmap(fname),1)
    })
  })
})

// --------------------------------------------------

qinterfaces = {}

function binterface(value) {
    qi = value.router+':'+value.interface

// todo  regex router names
// todo  regex interfaces

    qinterface = qinterfaces[qi]
    if(!qinterface) {
      qinterface = { router:value.router, interface:value.interface,
         in: { ibps:0, bps:0  },
         out: { ibps:0, bps:0 },
      }
      qinterfaces[qi] = qinterface
    }
    if(value.flow == 'in') {
        qinterface.in = { ibps:value.ibps, bps:value.bps }
    } else
    if(value.flow == 'out') {
        qinterface.out = { ibps:value.ibps, bps:value.bps }
    }
    return qinterface
}

// --------------------------------------------------

db.subscribe("interface");
db.on("message", function (channel, message) {
  if(channel!=='interface') return;
  var value = null;
  try {
    value = JSON.parse(message)
    qinterface = binterface(value)
    io.sockets.emit('interface',qinterface)
  } catch(e) {
    console.log('Pb to parse message',value)
    return
  }
});
db.subscribe("interface");

