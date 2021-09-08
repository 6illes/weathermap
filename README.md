[//]: <!-- 6illes 2021 09 05 -->

# This is NW6
an easy simple network weathermap by 6illes

## Features
- using [cytoscape] js library
- online design of your network weathermap
- save/load your design and keep history
- value the links (via pubsub of messages)
- monitor your network
- using stack ```node redis expressjs socket.io```

[cytoscape]: https://js.cytoscape.org/

## Installation
I recommend you use [debian]
First install redis server and nodejs ```#> apt install redis nodejs```
- unzip the archive
- install npm modules  ```#>./install.sh```

[redis] is used for pubsub

[expressjs] is used for http/https

[handlebars] is used for html templating

[socketio] is used for websocket

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

The nodejs script ```#> node query.js``` allows to gather link values listed in ```public/net.txt``` at regular intervals of time and pass it to the weathermap web application via a redis pubsub (publish/subscribe) message.

The current script get the values via simple http requests.

Feel free to write your own collector.

## Network simulation

To help start with NW6 network weathermap, you can use the link simulation script ```#> ǹode simul.js```.

## Commands

In the following :
- node are routers and
- edges are unidirectionnal links.

Midpoints in red between converging edges are used to separate between input and output trafic on the link.

You can create nodes (routers) by a simple ```click``` and change its characteristics. 
Multiple nodes can be modified at once when selected using ```shift``` key.

Change the routers icons by a simple pressing of the ```r``` key.
Change the name of the router by editing its ```Label```, matching its name as in ```public/net.txt```.

You can create edges (links) by a simple ```shift``` and ```click``` between two nodes.
Multiple edges can be modified at once when selected using ```shift``` key.

Change the edges shape by a simple pressing of the ```e``` key.
Change the name of the output link by editing the ```Interface```, matching its name as in ```public/net.txt```.

You can delete your selected nodes or edges by pressing the ```Escape``` key.

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
| x | Align selected router nodes on x axis |
| y | Align selected router nodes on y axis |
| h | Evenly distribute selected router nodes on horizontal axis |
| v | Evenly distribute selected router nodes on vertical axis |

## Contributions

Please feel free to clone, correct or improve the code.
Let me know if you need new features.

## Donation

You can buy me a beer or donate for a VM on Scaleway 

## License

This is free software

Copyright (c) 2021 Gilles A.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
