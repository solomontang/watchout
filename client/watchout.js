// start slingin' some d3 here.

var enemies = [];
var nEnemies = 30;

var scoreBoard = {
  score: 0,
  highScore: 0,
  collisions: 0
};

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
  // DATA JOIN
  var asteroids = gameBoard.selectAll('image')
    .data(data);

  // UPDATE EXISTING ASTEROIDS
  asteroids.data(data)
    .transition()
      .duration(1000)
      .attr('x', function(d) {return d.x})
      .attr('y', function(d) {return d.y});

  // ENTER
  asteroids.enter().append('image')
    .attr('class', 'enemy')
    .attr('xlink:href', 'asteroid.png')
    .attr('x', function(d) {return d.x})
    .attr('y', function(d) {return d.y});

  // asteroids.exit().remove(); unnecessary line for now
};

// function that increments score and displays changes to the html page
var updateScoreBoard = function() {
  scoreBoard.score++;
  // if collisions, collision++ and current score = 0

  if (scoreBoard.score > scoreBoard.highScore) {
    scoreBoard.highScore = scoreBoard.score;
  }

  // HTML PORTION
  var highscore = d3.select('.highscore span')
    .text(scoreBoard.highScore);
  var currentscore = d3.select('.current span')
    .text(scoreBoard.score);
};

//initialize
update(enemies);

//call update function on set interval
setInterval(function() {
  updateScoreBoard();
  newPosition();
  update(enemies);
}, 1000);

