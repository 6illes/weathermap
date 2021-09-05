
doedit = false

function editor() {
   doedit = !doedit
}



var cycontainer = document.getElementById('cy')

var cy = cytoscape({
  container: cycontainer,
  elements: {
    nodes: [ ],
    edges: [ ],
  }
})


function newmap() {
  return {
     nbofelts:0,
     listofnodes: { },
     listofjoins: { },
     listofedges: { },
     biedges: { },
     fqinterfaces: { },
     classes: { },
  }
}

map0 = newmap()

var selected = 0
var dselected = 0

function cleanthemap() {
   cy.nodes().remove()
   cy.edges().remove()
   map0 = newmap()
}
function setthemap() {
   map = imap.value
   socket.emit('setmap',map,JSON.stringify(map0))
}
function getthemap() {
   map = imap.value
   socket.emit('getmap',map)
}

socket.on('getmap',function(smap) {

   cleanthemap()

   selected = 0
   dselected = 0

   map0 = JSON.parse(smap)

   if(!map0.classes) map0.classes = {}

   for(var i in map0.listofnodes) {
      var node = map0.listofnodes[i]
      var classes = map0.classes[i]
      newNode2(i,node.position,node.label,classes)
   }
   for(var i in map0.listofjoins) {
      var node = map0.listofjoins[i]
      newJoin2(i,node.position)
   }
   for(var i in map0.listofedges) {
      var edge = map0.listofedges[i]
      var classes = map0.classes[i]
      newLink2(i,edge.source,edge.target,'...',classes)
   }
   if(!map0.fqinterfaces) map0.fqinterfaces = {}   // compat

   cy.center()
})






cy.style().fromJson([
    {
      selector: 'node',
      css: {
        'width': '75px',
        'height': '75px',
        'shape': 'octagon',
        'border-opacity': '0',
        'content': 'data(id)',
      }
    },
    {
      selector: 'node:selected',
      css: {
        'color': '#fff',
        'background-color': '#000',
        'background-opacity': '1',
        'border-opacity': '0',
        'border-width': 5,
        'border-color': '#000',
      }
    },
    {
      selector: 'node.router',
      css: {
        'background-fit': 'cover cover',
        'background-clip': 'none',
        'background-opacity': '1',
      }
    },
    {
      selector: 'node.router3d2',
      css: {
        'width': '90px',
        'height': '75px',
        'shape': 'ellipse',
        'background-image': ['/public/router2.png'],
        'background-opacity': '0',
      }
    },
    {
      selector: 'node.router3d3',
      css: {
        'width': '90px',
        'height': '75px',
        'shape': 'ellipse',
        'background-image': ['/public/router3.png'],
        'background-opacity': '0',
      }
    },
    {
      selector: 'node.router1',
      css: {
        'width': '85px',
        'height': '85px',
        'shape': 'ellipse',
        'background-image': ['/public/routers1.png'],
      }
    },
    {
      selector: 'node.router2',
      css: {
        'width': '85px',
        'height': '85px',
        'shape': 'ellipse',
        'background-image': ['/public/routers2.png'],
      }
    },
    {
      selector: 'node.router3',
      css: {
        'width': '85px',
        'height': '85px',
        'shape': 'ellipse',
        'background-image': ['/public/routers3.png'],
      }
    },
    {
      selector: 'node.platform1',
      css: {
        'width': '90px',
        'height': '90px',
        'shape': 'ellipse',
        'background-image': ['/public/platforms1.png'],
      }
    },
    {
      selector: 'node.platform2',
      css: {
        'width': '90px',
        'height': '90px',
        'shape': 'ellipse',
        'background-image': ['/public/platforms2.png'],
      }
    },
    {
      selector: 'node.platform3',
      css: {
        'width': '90px',
        'height': '90px',
        'shape': 'ellipse',
        'background-image': ['/public/platforms3.png'],
      }
    },
    {
      selector: 'node.platform4',
      css: {
        'width': '90px',
        'height': '90px',
        'shape': 'ellipse',
        'background-image': ['/public/platforms4.png'],
      }
    },
    {
      selector: 'node.rectangle1',
      css: {
        'width': '200px',
        'height': '50px',
        'shape': 'rectangle',
      }
    },
    {
      selector: 'node.rectangle2',
      css: {
        'width': '50px',
        'height': '200px',
        'shape': 'rectangle',
      }
    },
    {
      selector: 'node.small',
      css: {
        'width': '85px',
        'height': '50px',
        'shape': 'ellipse',
      }
    },
    {
      selector: 'node[label]',
      css: {
        'color': '#fff',
        'font-size': 12,
        'font-weight': 'bold',
        'text-wrap': 'wrap',
        'text-valign': 'center',
        'text-halign': 'center',
        'label': 'data(label)',
      }
    },
    {
      selector: 'node[label].router',
      css: {
        'color': '#fff',
      }
    },
    {
      selector: 'node[label].router3d2',
      css: {
        'color': '#fff',
        'background-color': '#fff',
        'background-opacity': '0',
      }
    },
    {
      selector: 'node[label].router3d3',
      css: {
        'color': '#fff',
        'background-color': '#fff',
        'background-opacity': '0',
      }
    },
    {
      selector: 'node[label].router1',
      css: {
        'color': '#fff',
        'background-color': '#fff',
        'background-opacity': '1',
        'text-background-color': '#ffa500',
        'text-background-opacity': '1',
        'text-background-padding': '6',
      }
    },
    {
      selector: 'node[label].router2',
      css: {
        'color': '#fff',
        'background-color': '#fff',
        'background-opacity': '1',
        'text-background-color': '#c41230',
        'text-background-opacity': '1',
        'text-background-padding': '6',
      }
    },
    {
      selector: 'node[label].router3',
      css: {
        'color': '#fff',
        'background-color': '#fff',
        'background-opacity': '1',
        'text-background-color': '#1a2671',
        'text-background-opacity': '1',
        'text-background-padding': '6',
      }
    },
    {
      selector: 'node[label].platform1',
      css: {
        'color': '#000',
        'text-valign': 'bottom',
      }
    },
    {
      selector: 'node[label].platform2',
      css: {
        'color': '#000',
        'text-valign': 'bottom',
      }
    },
    {
      selector: 'node[label].platform3',
      css: {
        'color': '#000',
        'text-valign': 'bottom',
      }
    },
    {
      selector: 'node[label].platform4',
      css: {
        'color': '#000',
        'text-valign': 'bottom',
      }
    },
    {
      selector: '.empty-joint',
      css: {
        'width': '5px',
        'height': '5px',
        'shape': 'ellipse',
        'border-width': 0,
        'background-opacity': 1,
        'background-color': '#f00',
        'content': '',
      }
    },
    {
      selector: 'edge',
      css: {
        'width' : '30px',
        'source-endpoint': 'inside-to-node',
        'curve-style': 'straight',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': '#ccc',
        'arrow-scale': '0.55',
        'line-color': '#eee',
        'border-opacity': 0,
        'border-width': 0,
      }
    },
    {
      selector: 'edge.straight',
      css: {
         'curve-style': 'straight',
      }
    },
    {
      selector: 'edge.curve',
      css: {
         'curve-style': 'unbundled-bezier',
         'control-point-step-size':50,
         'control-point-weights':'0.5',
      }
    },
    {
      selector: 'edge.curve2',
      css: {
         'curve-style': 'unbundled-bezier',
         'control-point-step-size':100,
         'control-point-weights':'0.25',
      }
    },
    {
      selector: 'edge.curve3',
      css: {
         'curve-style': 'unbundled-bezier',
         'control-point-step-size':50,
         'control-point-weights':'0.75',
      }
    },
    {
      selector: 'edge:selected',
      css: {
        'width' : '35px',
        'target-arrow-color': '#00f',
        'line-color': '#00f',
      }
    },
    {
      selector: 'edge[label]',
      css: {
        'color': '#000',
        'font-size': 12,
        'label': 'data(label)',
        'text-valign': 'center',
        'text-halign': 'center',
        'text-wrap': 'wrap',
        'text-border-opacity': 1,
        'text-border-color': '#000',
        'text-border-width': 0.6,
        'text-background-padding': 5,
        'text-background-opacity': 1,
        'text-background-color': '#fff',
      }
    }
  ]).update()

cy.layout({
    name: 'preset'
})



xrouter = 0
xrouters = ['router3d2','router3d3','router1','router2','router3','platform1','platform2','platform3','platform4','small','rectangle1','rectangle2']

function getRouter() {
   xrouter++
   if(xrouter>=xrouters.length) xrouter = 0
   return xrouters[xrouter]
}

xedge = 0
xedges = ['straight','curve','curve2','curve3']

function getEdge() {
   xedge++
   if(xedge>=xedges.length) xedge = 0
   return xedges[xedge]
}













var isover = false

function newNode2(x,position,label,classes) {
  label2 = label.toUpperCase()
  cy.add({ group: 'nodes', data: { id:x, width:100, height:100, weight:75, label:label2 }, position:position, classes:classes })
  map0.classes[x] = classes
}
function newJoin2(x,position) {
  label2 = x.toUpperCase()
  cy.add({ group: 'nodes', data: { id:x,label:label2 }, position:position, classes:'empty-joint' })
}
function newLink2(x,srce,dest,label,classes) {
  label2 = label.toUpperCase()
  cy.add({ group: 'edges', data: { id:x, source:srce, target:dest, width:50, label:label2 }, classes:classes })
  cy.getElementById(x).classes(classes)
}
function newNode(position) {
  x = 'node'+map0.nbofelts++
  elt = cy.getElementById(x)
  newNode2(x,position,x,'router')
  map0.listofnodes[x] = { label:x, position:position }
  isover = true
  selected = cy.getElementById(x)
  selected.select()
}
function newLink(srce,dest) {
  ez = 'join'+map0.nbofelts++
  newJoin2(ez,{x:0,y:0})
  cy.automove({
    nodesMatching: cy.$('#'+ez),
    reposition: 'mean',
    meanOnSelfPosition: function( node ){ return true; }
  });

  ee1 = 'edge'+map0.nbofelts++;
  ee2 = 'edge'+map0.nbofelts++;

  newLink2(ee1,srce,ez,ee1)
  newLink2(ee2,dest,ez,ee2)

  map0.biedges[ee1] = { peer:ee2, join:ez }
  map0.biedges[ee2] = { peer:ee1, join:ez }

  ezposition = cy.getElementById(ez).position()
  map0.listofjoins[ez] = { position:ezposition }

  data1 = { source:srce, target:ez  }
  data2 = { source:dest, target:ez  }

  map0.listofedges[ee1] = data1
  map0.listofedges[ee2] = data2
}



var keyshift = false
var keyctrl  = false

cy.on('click',function(evt) {
  if(doedit && !isover) {
    return newNode(evt.position)
  }
  if(selected===evt.target) return
  dselected = selected
  selected = evt.target
})
cy.on('click','node',function(evt) {
  label.value = selected.data('label').toUpperCase()
  if(!keyshift) return
  if(dselected==0) return
  if(dselected.isEdge()) return
  if(!doedit) return
  newLink(dselected.id(),selected.id())
  dselected = 0
  keyshift = false
})
cy.on('click','edge',function(evt) {
  label.value = selected.id().toUpperCase()
  id = selected.id()
  edge = map0.listofedges[id]
  itf.value = edge.interface
  flow.value = edge.flow
  ibps.value = edge.ibps
  console.log('edge',edge)
  console.log('edge2',selected)
})


cy.on('mousedown',function(evt) {
})
cy.on('mouseup','node',function(evt) {
   var node = evt.target
   lofn = map0.listofnodes[node.id()]
   lofj = map0.listofjoins[node.id()]
   if(typeof lofn !== 'undefined') {
      lofn.position = node.position()
   } else {
      lofj.position = node.position()
   }
})
cy.on('mouseover',function(evt) {
   isover = !evt.target._private.container
})
cy.on('mouseout',function(evt) {
   isover = false
})







function removeNode(node) {
   cedges = node.connectedEdges()
   for(let i = 0; i < cedges.length; i++) {
      removeEdge(cedges[i])
   }
   delete map0.listofnodes[node.id()]
   delete map0.classes[node.id()]
   cy.remove(node)
}
function removeEdge(edge) {
   id = edge.id()
   peer = map0.biedges[id].peer
   join = map0.biedges[id].join
   delete map0.listofedges[id]
   delete map0.listofedges[peer]
   delete map0.listofjoins[join]
   delete map0.biedges[id]
   delete map0.biedges[peer]
   cy.remove(edge)
   cy.remove(cy.getElementById(peer))
   cy.remove(cy.getElementById(join))
}



document.addEventListener("keydown",function(e) {
  keyshift = (e.key==='Shift')
  keyctrl = (e.key==='Control')
  if(e.target.id=='imap') return
  if(e.target.id=='label') return
  if(e.target.id=='itf') return
  console.log('key',e.target.id)
  if(e.key==='Escape') {
     if(!doedit) return
     if(selected.isNode()) {
        removeNode(selected)
     } else {
        removeEdge(selected)
     }
     selected = 0
     isover = false;
     return
  } else
  if(e.key==='x') {
    var minx = 10000
    var group = cy.$(':selected')
    for(i = 0; i<group.length; i++) {
       var g = group[i]
       if(g.isEdge()) continue
       minx = Math.min(minx,g.position('x'))
    }
    for(i = 0; i<group.length; i++) {
       var g = group[i]
       g.position('x',minx)
    }
  } else
  if(e.key==='y') {
    var miny = 10000
    var group = cy.$(':selected')
    for(var i = 0; i<group.length; i++) {
       var g = group[i]
       if(g.isEdge()) continue
       miny = Math.min(miny,g.position('y'))
    }
    for(var i = 0; i<group.length; i++) {
       var g = group[i]
       g.position('y',miny)
    }
  } else
  if(e.key==='h') {
    var tab=[]
    var minx = 10000
    var maxx = 0
    var group = cy.$(':selected')
    for(var i = 0; i<group.length; i++) {
       var g = group[i]
       if(g.isEdge()) continue
       if(g.id().slice(0,4)=='join') continue
       var posx = g.position('x')
       tab.push({ obj:g, x:posx })
       minx = Math.min(minx,posx)
       maxx = Math.max(maxx,posx)
    }
    tab.sort(function(a,b){
      return a.x - b.x;
    });
    var val = (maxx-minx)/(i-1)
    for(var i in tab) {
       tab[i].obj.position('x',minx+i*val)
    }
  } else
  if(e.key==='v') {
    var tab=[]
    var miny = 10000
    var maxy = 0
    var group = cy.$(':selected')
    for(var i = 0; i<group.length; i++) {
       var g = group[i]
       if(g.isEdge()) continue
       if(g.id().slice(0,4)=='join') continue
       var posy = g.position('y')
       tab.push({ obj:g, y:posy })
       miny = Math.min(miny,posy)
       maxy = Math.max(maxy,posy)
    }
    tab.sort(function(a,b){
      return a.y - b.y;
    });
    var val = (maxy-miny)/(i-1)
    for(var i in tab) {
       tab[i].obj.position('y',miny+i*val)
    }
  } else
  if(e.key==='r') {
     if(!doedit) return
    var group = cy.$('node:selected')
    var r = getRouter()
    for(var i = 0; i<group.length; i++) {
       var g = group[i]
       if(g.id().slice(0,4)=='join') continue
       g.classes('router '+r)
       map0.classes[g.id()] = 'router '+r
    }
  } else 
  if(e.key==='e') {
    if(!doedit) return
    var group = cy.$('edge:selected')
    var e = getEdge()
    for(var i = 0; i<group.length; i++) {
       var g = group[i]
       g.classes('edge '+e)
       map0.classes[g.id()] = 'edge '+e
    }
  } else
  if(e.key==='a') {
    if(!selected) return
    if(selected.id().slice(0,4)!='join') return
    cy.automove({
       nodesMatching: selected,
       reposition: 'mean',
    })
  }
})



// Test input

function testNode(value) {
    // TODO regex validate routers
    return true
}
function testInterface(value) {
    // TODO regex
    test0 = value.length < 20
    test1 = /^Gi/.test(value)
    test2 = /^Te/.test(value)
    test3 = /^TenGigE/.test(value)
    test4 = /^Bundle-Ether/.test(value)
    test5 = /^BE/.test(value)
    tests = test0 && (test1||test2||test3|test4|test5)
    return true
}
function testFlow(value) {
    return /^(in|out)$/.test(value)
}


imap.onkeyup = function(e) {
   if(e.key==='Enter') getthemap()
}
label.onkeyup = function(e) {
   if(!selected) return
   if(e.key==='Enter') {
      if(selected.isNode()) {
         if(!testNode(label.value)) return
         selected.data('label',label.value);
         map0.listofnodes[selected.id()].label = label.value
      }
   }
}
function updateLink(ledge,lnode) {
   var lrtr = lnode.data('label')
   var edge = map0.listofedges[ledge]
   var biedge = map0.biedges[ledge]
   edge.interface = itf.value
   edge.flow = 'out'
   edge.ibps = '...'
   flow.value = 'out'
   ibps.value = '...'
   var peer = map0.listofedges[biedge.peer]
   peer.interface = itf.value
   peer.flow = 'in'
   peer.ibps = '...'
   var fqinterface = lrtr+':'+itf.value
   map0.fqinterfaces[fqinterface] = { 
      id:ledge, router:lrtr, interface:itf.value, flow:flow.value,
      peer: biedge.peer, join: biedge.join,
   }
}
itf.onkeyup = function(e) {
   if(!selected) return
   if(e.key==='Enter') {
      if(selected.isEdge()) {
         if(!testInterface(itf.value)) return
         var ledge = selected.id()
         var lnode = selected.source()
         updateLink(ledge,lnode)
      }
   }
}

socket.on('interface',function(linterface) {
//   console.log('intf',linterface)

   if(!testNode(linterface.router)) return
   if(!testInterface(linterface.interface)) return

   var fqi = linterface.router+':'+linterface.interface
   if(!map0.fqinterfaces) return
   var fqinterface = map0.fqinterfaces[fqi]
   if(!fqinterface) return
   var ledge = fqinterface.id
   var lpeer = fqinterface.peer
   if(!map0.listofedges[ledge]) return

   map0.listofedges[ledge].ibps = linterface.out.ibps
   map0.listofedges[lpeer].ibps = linterface.in.ibps

   var edge = cy.getElementById(ledge)
   var peer = cy.getElementById(lpeer)

   edge.data('label',linterface.out.bps)
   peer.data('label',linterface.in.bps)

   var rate = linterface.out.bps/linterface.out.ibps
   var color = vcolor(rate)
   edge.style('line-color',color)
   edge.style('target-arrow-color',color)

   rate = linterface.in.bps/linterface.in.ibps
   color = vcolor(rate)
   peer.style('line-color',color)
   peer.style('target-arrow-color',color)
})
