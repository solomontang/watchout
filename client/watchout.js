// SCOREBOARD
var scoreBoard = {
  score: 0,
  highScore: 0,
  collisions: 0
};

var gameOptions = {
  height: 480,
  width: 852
};

// PLAYER INITIALIZE AND METHODS
var player = {
  x: gameOptions.width / 2 - 100,
  y: gameOptions.height / 2 - 100
};
var enemies = [];
var nEnemies = 10;
var gameBoard = d3.select('.board').append('svg:svg');

var newPosition = function () {
  _.range(0, nEnemies).forEach((i) => {
    enemies[i] = {
      id: i,
      x: Math.random() * gameOptions.width,
      y: Math.random() * gameOptions.height
    };
  });
};


var spawnFred = function(data) {
  var fred = gameBoard.selectAll('.player')
    .data(data);

  fred.enter().append('image')
    .attr('class', 'player')
    .attr('xlink:href', 'player.jpg')
    .attr('x', function() {return player.x})
    .attr('y', function() {return player.y})
};

//transition?
var update = function(data) {
  // DATA JOIN
  var asteroids = gameBoard.selectAll('.enemy')
    .data(data);

  // UPDATE EXISTING ASTEROIDS
  asteroids.data(data)
    .transition()
      .duration(500)
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

  if (collision) {
    collision = false;
    scoreBoard.score = 0;
    scoreBoard.collisions++;
  }

  if (scoreBoard.score > scoreBoard.highScore) {
    scoreBoard.highScore = scoreBoard.score;
  }

  // HTML PORTION
  var highscore = d3.select('.highscore span')
    .text(scoreBoard.highScore);
  var currentscore = d3.select('.current span')
    .text(scoreBoard.score);
  var collisions = d3.select('.collisions span')
    .text(scoreBoard.collisions);
};

//initialize
newPosition();
spawnFred([undefined]);
update(enemies);

var collision = false;
var fredSwap = true;

var checkCollision = gameBoard.selectAll('image') 
  .on('mouseover', function() {
    collision = true;
    if (fredSwap) {
      fredSwap = false;
      gameBoard.selectAll('.player')
        .attr('xlink:href', 'cage.png');
    } else {
      fredSwap = true;
      gameBoard.selectAll('.player')
        .attr('xlink:href', 'player.jpg');
    }

  });

//call update function on set interval
setInterval(function() {
  updateScoreBoard();
  newPosition();
  update(enemies);
}, 500);

