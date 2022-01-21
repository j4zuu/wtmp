const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const min = document.querySelector('#min');
const max = document.querySelector('#max');
const tries = document.querySelector('#tries');
const bot = document.querySelector('#bot');
let guessCount = 1;
let resetButton;

const totalCount = 50;
const minValue = 0;
const maxValue = 100;
const trueMax = maxValue - minValue;

const avgCount = [];

let guessesArr = [];

min.textContent = minValue.toString();
max.textContent = maxValue.toString();
tries.textContent = totalCount.toString();
let startTime = Date.now();
let endTime = Date.now();

let randomNumber = Math.floor(Math.random() * trueMax) + minValue;
console.log('Random number: ' + randomNumber);

const source = (source) => {
  if (source === 'user') {
    console.log('Source: ' + Number(guessField.value));
    return Number(guessField.value);
  } else return source;
};

const checkGuess = (count, origin) => {
  const currentGuess = source(origin);
  guessesArr.push(currentGuess);
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }

  guesses.textContent = guessesArr;
  let temp = '';

  if (currentGuess === randomNumber) {
    endTime = Date.now();
    const totalTime = endTime - startTime;
    lastResult.textContent = `Congratulations! You got it right! Time: ${totalTime /
    1000}s. Guesses: ${guessCount}`;
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
    temp = 'over';
  } else if (guessCount === count) {
    lastResult.textContent = '!!!GAME OVER!!!';
    lowOrHi.textContent = '';
    setGameOver();
    temp = 'over';
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if (currentGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
      temp = 'tooLow';
    } else if (currentGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
      temp = 'tooHigh';
    }
  }
  guessCount++;
  guessField.value = '';
  guessField.focus();
  return temp;
};

guessSubmit.addEventListener('click', function() {
  checkGuess(totalCount, 'user');
});

bot.addEventListener('click', function() {
  solver(totalCount, maxValue, minValue);
});

const setGameOver = () => {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  bot.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
};

/**
 * Algorithm for solving the number guessing game
 * @param tries = amount of times the algorithm can guess the number
 * @param max = biggest the number could be
 * @param min = smallest the number could be
 *
 * Algorithm takes the max and min values, guesses the optimal
 * one in between them (rounded) and given the result, sets the new
 * max or min to correspond last guess. For example max 100, min 0
 * -> 50, 25, 13, 7 (assuming the real number is 7)
 */
const solver = (tries, max, min) => {
  let gMax = max;
  let gMin = min;
  let temp = gMax + gMin;
  let currentGuess = Math.round(temp / 2);
  for (let i = 0; i < tries; i++) {
    const highOrLow = checkGuess(totalCount, currentGuess);
    if (highOrLow === 'tooLow') {
      gMin = currentGuess;
      const temp = gMax + gMin;
      currentGuess = Math.round(temp / 2);
    } else if (highOrLow === 'tooHigh') {
      gMax = currentGuess;
      const temp = gMax + gMin;
      currentGuess = Math.round(temp / 2);
    } else if (highOrLow === 'over') {
      i = tries;
      resetGame();
    }
  }
};

/**
 * Looper for testing the algorithm
 * @param testAmount
 * logs average (usually around ~7.27) amount of guesses and max amount of guesses (51)
 */
const algTester = (testAmount) => {
  for (let i = 0; i < testAmount; i++) {
    solver(totalCount, maxValue, minValue);
  }

  console.log(avgCount);
  const sum = avgCount.reduce((a, b) => a + b, 0);
  const avg = (sum / avgCount.length) || 0;
  console.log(Math.max(...avgCount));
  console.log(Math.min(...avgCount));
  console.log(avg);
};

const resetGame = () => {
  avgCount.push(guessCount);
  startTime = Date.now();
  guessCount = 1;
  const resetParas = document.querySelectorAll('.resultParas p');
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
  }
  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  bot.disabled = false;
  guessField.value = '';
  guessesArr = [];
  guessField.focus();
  lastResult.style.backgroundColor = 'white';
  randomNumber = randomNumber = Math.floor(Math.random() * trueMax) + minValue;
};

algTester(100000);


