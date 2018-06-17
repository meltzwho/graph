$(document).ready(function () {
  var cy = cytoscape({
    container: $('#graph'),

    elements: [{
      group: 'nodes',
      data: {
        id: 'a'
      }
    }, {
      group: 'nodes',
      data: {
        id: 'b'
      }
    }, {
      group: 'edges',
      data: {
        id: 'e',
        source: 'a',
        target: 'b'
      }
    }],

    style: [{
      selector: 'node',
      style: {
        'label': 'data(id)',
        'text-halign': 'center',
        'text-valign': 'center'
      }
    }]
  });

  var options = {
    name: 'circle',

    fit: true, // whether to fit the viewport to the graph
    padding: 30, // the padding on fit
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
    radius: undefined, // the radius of the circle
    startAngle: 3 / 2 * Math.PI, // where nodes start in radians
    sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
    clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
    sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled
    animateFilter: function (node, i) {
      return true;
    }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
    ready: undefined, // callback on layoutready
    stop: undefined, // callback on layoutstop
    transform: function (node, position) {
      return position;
    } // transform a given node position. Useful for changing flow direction in discrete layouts

  };

  var layout = cy.layout(options);
  layout.run();

  var addNode = function () {
    var key = parseVal();
    if (cy.$id(key).empty() && key !== '...node value' &&
      key) {
      console.log('a');
      cy.add({
        group: 'nodes',
        data: {
          id: key
        },
        position: {
          x: random(),
          y: random()
        }
      });
    }
    layout.run();
  };

  var rmNode = function () {};

  var addEdge = function () {
    var edge = parseEdge();
    if (cy.$id(edge.join()).empty() &&
      !cy.$id(edge[0]).empty() &&
      !cy.$id(edge[1]).empty()) {
      cy.add({
        group: 'edges',
        data: {
          id: edge.join(),
          source: edge[0],
          target: edge[1]
        }
      });
    }
    layout.run();

  };

  var rmEdge = function () {};

  var parseVal = function () {
    var val = $('#value').val();
    return val;
  };

  var parseEdge = function () {
    var edge = $('#edge').val();
    return edge.split(':');
  };

  $('#addNode').click(addNode);

  $('#rmNode').click(rmNode);

  $('#addEdge').click(addEdge);

  $('#rmEdge').click(rmEdge);

  $('#value').focusin(function () {
    $('#value').val('');
  });

  $('#value').focusout(function () {
    setTimeout(function () {
      $('#value').val('...node value');
    }, 200);
  });

  $('#edge').focusin(function () {
    $('#edge').val('');
  });

  $('#edge').focusout(function () {
    setTimeout(function () {
      $('#edge').val('[FROM NODE]:[TO NODE]');
    }, 200);
  });

  var random = function () {
    return Math.floor(Math.random() * 750);
  };
});
