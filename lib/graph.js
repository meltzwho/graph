// Instantiate a new graph
var Graph = function () {
  this.store = {};
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function (node) {
  this.store[node] = {};
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function (node) {
  return this.store.hasOwnProperty(node);
};

// Removes a node from the graph.
Graph.prototype.removeNode = function (node) {
  if (this.store.hasOwnProperty(node)) {
    _.each(this.store, function (each) {
      if (each.hasOwnProperty(node)) {
        delete each[node];
      }
    });
    delete this.store[node];
  }
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function (fromNode, toNode) {
  if (typeof this.store[fromNode] === 'object') {
    return this.store[fromNode].hasOwnProperty(toNode);
  }
  throw new Error("fromNode does not exist");
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function (fromNode, toNode) {
  if (this.store.hasOwnProperty(fromNode) && this.store.hasOwnProperty(toNode)) {
    this.store[fromNode][toNode] = null;
    this.store[toNode][fromNode] = null;
  }
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function (fromNode, toNode) {
  if (this.store.hasOwnProperty(fromNode) && this.store.hasOwnProperty(toNode)) {
    if (this.store[fromNode].hasOwnProperty(toNode)) {
      delete this.store[fromNode][toNode];
      delete this.store[toNode][fromNode];
    }
  }
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function (cb) {
  for (var key in this.store) {
    cb(key);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 * addNode : O(1)
 * contains : O(1)
 * removeNode : O(n) must inforce undirected graph spec
 * hasEdge : O(1)
 * addEdge : O(1)
 * removeEdge : O(1)
 * forEachNode : O(n)
 */
