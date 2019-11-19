'use strict';

// Debugging shortcuts
// To address data at specific locations do this:
// console.log('the value at bottom right is: ' + categories[0].clues[4][0]);
// console.log('clue at top left: ' + categories[0].clues[0][1]);
// console.log('question at bottom right: ' + categories[5].clues[4][2]);
// console.log('logs out the entire array with all the objects: ' + categories);


// categories[category_i].clues[clue_i][data_i]);

var categories = [];

function Category(name, clues) {
  this.name = name;
  this.clues = clues;
  categories.push(this);
}

var Cat0 = new Category('science', [
  [100, 'It\'s the largest blood vessel in the body', 'The Aorta?', true],
  [200, 'Earth is farthest from the sun during this month', 'July', true],
  [300, 'This hardest tissue in the body covers the crown of a tooth', 'Enamel', true],
  [400, '18399 feet down the Molloy Deep is the deepest point in this ocean', 'The Arctic', true],
  [500, 'This element\'s symbol W comes from wolfram its alternate name', 'Tungsten', true]
]);

var Cat1 = new Category('war stories', [
  [100, 'The African Queen by C.S. Forester', 'world war I', true],
  [200, 'Mister Roberts & The Naked and the Dead', 'world war II', true],
  [300, 'Gods and Generals by Jeff Shaara', 'the civil war', true],
  [400, 'Rise to Rebellion by Jeff Shaara', 'the american revolution', true],
  [500, 'The Last of the Mohicans', 'The French and Indian wars', true]
]);

var Cat2 = new Category('Before & After', [
  [100, 'It\'s the largest blood vessel in the body', 'The Aorta?', true],
  [200, 'Earth is farthest from the sun during this month', 'July', true],
  [300, 'This hardest tissue in the body covers the crown of a tooth', 'Enamel', true],
  [400, '18399 feet down the Molloy Deep is the deepest point in this ocean', 'The Arctic', false],
  [500, 'This element\'s symbol W comes from wolfram its alternate name', 'Tungsten', true]
]);

var Cat3 = new Category('American History', [
  [100, 'It\'s the largest blood vessel in the body', 'The Aorta?', true],
  [200, 'Earth is farthest from the sun during this month', 'July', true],
  [300, 'This hardest tissue in the body covers the crown of a tooth', 'Enamel', true],
  [400, '18399 feet down the Molloy Deep is the deepest point in this ocean', 'The Arctic', true],
  [500, 'This element\'s symbol W comes from wolfram its alternate name', 'Tungsten', true]
]);

var Cat4 = new Category('Word Origins', [
  [100, 'It\'s the largest blood vessel in the body', 'The Aorta?', true],
  [200, 'Earth is farthest from the sun during this month', 'July', true],
  [300, 'This hardest tissue in the body covers the crown of a tooth', 'Enamel', true],
  [400, '18399 feet down the Molloy Deep is the deepest point in this ocean', 'The Arctic', true],
  [500, 'This element\'s symbol W comes from wolfram its alternate name', 'Tungsten', true]
]);

var Cat5 = new Category('category 5', [
  [100, 'It\'s the largest blood vessel in the body', 'The Aorta?', true],
  [200, 'Earth is farthest from the sun during this month', 'July', true],
  [300, 'This hardest tissue in the body covers the crown of a tooth', 'Enamel', true],
  [400, '18399 feet down the Molloy Deep is the deepest point in this ocean', 'The Arctic', true],
  [500, 'This element\'s symbol W comes from wolfram its alternate name', 'Tungsten', true]
]);

function renderBoard(domReference) {
  var tr1 = document.createElement('tr');

  for ( var categoryTitleIndex = 0; categoryTitleIndex < categories.length; categoryTitleIndex++ )
  {
    var td1 = document.createElement('td');

    td1.setAttribute('class', 'category');
    td1.textContent = categories[categoryTitleIndex].name;
    tr1.append(td1);
  }
  domReference.append(tr1);

  for ( var rowIndex = 0; rowIndex < categories.length; rowIndex++ ) {
    var tr2 = document.createElement('tr');

    for ( var clueIndex = 0; clueIndex < 6; clueIndex++ ) {
      var currentValue = categories[clueIndex].clues[rowIndex][0]; //Peter: There is an Uncaught TypeError: Cannot read property '0' of undefined, the first time this line is run. It makes no difference if I declare the var first and set it to 0. The program runs ok with it <shrug>
      var isShownFlag = categories[clueIndex].clues[rowIndex][3];

      var td2 = document.createElement('td');

      if (isShownFlag === true) {
        td2.setAttribute('class', 'clue');
        td2.setAttribute('id', `${clueIndex},${rowIndex}`); //Peter: +1 because index starts at 0 a values with 1
        td2.textContent = `$${currentValue}`;
        td2.addEventListener('click', tdClickManager);

        tr2.append(td2);
      } else {
        tr2.append(td2.textContent = '');
      }
    }
    domReference.append(tr2);
  }
}

function getValue(clueId) {
  var categoryIndex = clueId.charAt(0);
  var clueIndex = clueId.charAt(2);

  return categories[categoryIndex].clues[clueIndex][0];
}

function getAClue(clueId) {
  var categoryIndex = clueId.charAt(0);
  var clueIndex = clueId.charAt(2);

  return categories[categoryIndex].clues[clueIndex][1];
}

function getQuestion(clueId) {
  var categoryIndex = clueId.charAt(0);
  var clueIndex = clueId.charAt(2);

  return categories[categoryIndex].clues[clueIndex][2];
}

function getVisibility(clueId) {
  var categoryIndex = clueId.charAt(0);
  var clueIndex = clueId.charAt(3);

  return categories[categoryIndex].clues[clueIndex][3];
}

function tdClickManager(event) {
  var clueToDisplay = getAClue(event.target.id);

  table.innerHTML = '';

  var clueDisplayDiv = document.createElement('div');
  clueDisplayDiv.textContent = clueToDisplay;
  clueDisplayDiv.setAttribute('id', event.target.id);
  clueDisplayDiv.setAttribute('class', 'bigClue');

  table.append(clueDisplayDiv);
  clueDisplayDiv.addEventListener('click', clueClickManager);
}


function clueClickManager(event) {
  var question = getQuestion(event.target.id);

  table.innerHTML = '';

  var questionDisplayDiv = document.createElement('div');
  questionDisplayDiv.setAttribute('id', event.target.id);
  questionDisplayDiv.setAttribute('class', 'bigClue');
  questionDisplayDiv.textContent = question;

  table.append(questionDisplayDiv);
}

var table = document.getElementById('table');
renderBoard(table);
