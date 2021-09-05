[//]: <!-- 6illes 2021 09 05 -->

# This is NW6
an easy simple network weathermap by 6illes

## Features
- using [cytoscape] js library
- online design of your network weathermap
- save/load your design and keep history
- value the links (via pubsub of messages)
- monitor your network
- using ```node redis expressjs socket.io```

[cytoscape]: https://js.cytoscape.org/

## Installation
I recommend you use [debian]
First install redis server and nodejs ```#> apt install redis nodejs```
- unzip the archive
- install npm modules  ```#>./install.sh```
. [redis] is used for pubsub
. [expressjs] is used for http/https
. [handlebars] is used for html templating
. [socketio] is used for websocket

[debian]: http://debian.org
[redis]: http://redis.io
[expressjs]: https://expressjs.com
[handlebars]: https://handlebarsjs.com/
[socketio]: https://socket.io/

- execute the weathermap application ```#> node weathermap.js```
- design your network weathermap ```http://localhost:4000/ed```
- load/save your design
- distribute your design ```http://localhost:4000```

Now you need to value the links between your routers.

## Network links

The nodejs script ```#> node query.js``` allows to gather link values listed in ```public/net.txt``` at regular intervals and pass it to the weathermap web application via a redis pubsub (publish/subscribe).
The current script get the values via simple http request. Feel free to write your own collector.

## Network simulation

To help start with NW6 network weathermap, you can use the link simulation script ```#> ǹode simul.js```.

## Commands

In the following node are routers and edges are unidirectionnal links.
Midpoints in red between edges are used to separate between input and output links.

You can create nodes (routers) by a simple ```click``` and change its characteristics. 
Multiple nodes can be modified at once when selected using ```shiift``` key.
Change the routers icons by a simple pressing of ```r``` key.
Change the name of the router by editing the ```Label```, using those of ```public/net.txt```.

You can create edges (links) by a simple ```shift``` and ```click``` between two nodes.
Multiple edges can be modified at once when selected using ```shiift``` key.
Change the edges shape by a simple pressing of ```e``` key.
Change the name of the output link by editing the ```Interface```, using those of ```public/net.txt```.

You can delete your selected nodes or edges by pressing the ```Escame``` key.

Now you need an easy way to organize your nodes and edges on the map.

Nodes and mipoint nodes can be simply moved by a ```click and drag/drop```.
Something cool is the ability to ```automove``` the midpoints. Simply select it and press the ```a``` key. It's that simple.

Selected nodes can be vertically or horizontally aligned on axes via pressing the keys ```x``` and ```y```.
Selected nodes can be vertically or horizontally evenly distributed via pressing the keys ```h``` and ```v```.

It's that easy.

| Key | Command |
| ------ | ------ |
| Escape | Delete the selected routers and edges |
| Shift | Select multiple routers and edges or create a link |
| r | Toggle between routers icons |
| e | Toggle between edges shapes straight or curved |
| a | Automove a midpoint node between router nodes |
| x | Align selected router nodes on x axe |
| y | Align selected router nodes on y axe |
| h | Evenly distribute selected router nodes on horizontal axe |
| v | Evenly distribute selected router nodes on vertical axe |

## License

This is free software
