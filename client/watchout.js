// start slingin' some d3 here.

var enemies = [];
var nEnemies = 30;

var gameOptions = {
  height: 480,
  width: 852
};

var newPosition = function () {
  _.range(0, nEnemies).forEach((i) => {
    enemies[i] = {
      id: i,
      x: Math.random() * gameOptions.width,
      y: Math.random() * gameOptions.height
    };
  });
};

newPosition();
var gameBoard = d3.select('.board').append('svg:svg');
//transition?
var update = function(data) {
  
  gameBoard.selectAll('image.enemies').data(data, (d) => d.id)
    .enter().append('image')
    .attr('class', 'enemy')
    .attr('xlink:href', 'asteroid.png')
    .attr('x', function(d) {return d.x})
    .attr('y', function(d) {return d.y});

  // gameBoard.exit().remove();
};


//have an update function
//initialize
update(enemies);
  //need update and

//call update function on set interval
setInterval(function() {
  newPosition();
  update(enemies);
}, 1000);

// console.log(enemies);