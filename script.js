let questions = [
  {
    question: 'Wer hat HTML efunden?',
    answer_1: 'Robbie Williams',
    answer_2: 'Lady Gaga',
    answer_3: 'Tim Berners-Lee',
    answer_4: 'Justin Bieber',
    right_answer: 3,
  },

  {
    question: 'Was ist keine gültige Schreibweise für die Farbe Weiß?',
    answer_1: 'rgba(255,255,255,1)',
    answer_2: 'white',
    answer_3: '#ff',
    answer_4: '#FFF',
    right_answer: 3,
  },
  {
    question:
      'top positioniert ein HTML-Element von oben. Mit welchem Wert für position funktioniert top nicht?',
    answer_1: 'fixed',
    answer_2: 'absolute',
    answer_3: 'relative',
    answer_4: 'static',
    right_answer: 4,
  },
  {
    question: 'Was ist nicht das gleiche wie margin: 10px?',
    answer_1: 'margin: 10px 10px 10px 10px ',
    answer_2: 'margin: 10px 10px',
    answer_3: 'margin: 10px 10px 10px',
    answer_4: 'margin: 10 ',
    right_answer: 4,
  },
  {
    question: 'Welchen Strukturselektor gibt es breits seit CSS 1?',
    answer_1: ':first-letter ',
    answer_2: ':root',
    answer_3: ':last-child',
    answer_4: ':first-child',
    right_answer: 1,
  },

  {
    question:
      'Die Eigenschaft display hat seit CSS 3 neue Werte. Welcher ist hinzugekommen?',
    answer_1: 'table-cell',
    answer_2: 'grid-row',
    answer_3: 'inline-flex',
    answer_4: 'columns',
    right_answer: 3,
  },
  {
    question: 'Wie heißt der Erfinder von JavaScript?',
    answer_1: 'Douglas Crockford',
    answer_2: 'Brendan Eich',
    answer_3: 'John Resig',
    answer_4: 'Chuck Norris',
    right_answer: 2,
  },
  {
    question: 'Wer passt hier nicht in die Reihe?',
    answer_1: 'ActionScript',
    answer_2: 'JavaScript',
    answer_3: 'CoffeeScript',
    answer_4: 'AppleScript',
    right_answer: 4,
  },
  {
    question: 'Was ist false?',
    answer_1: '1/0 === Infinity',
    answer_2: '1.8e+987 === Infinity',
    answer_3: 'Number.MIN_VALUE * -2 === -Infinity',
    answer_4: 'Number.MAX_VALUE * 2 === Infinity',
    right_answer: 3,
  },
  {
    question: 'Was ist true?',
    answer_1: '0 == null',
    answer_2: '0 >= undefined',
    answer_3: '0 >= null',
    answer_4: '0 > null',
    right_answer: 3,
  },
];

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');
let AUDIO_WIN = new Audio('audio/win-score.mp3');
let AUDIO_LOST = new Audio('audio/lost-score.mp3');

function init() {
  document.getElementById('all-questions').innerHTML = questions.length; // change amont of questions
  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
    addAudioScore();
  } else {
    updateProgressBar();
    updateToNextQuestion();
  }
}
function gameIsOver() {
  // give true
  return currentQuestion >= questions.length;
}
function showEndScreen() {
  document.getElementById('endScreen').style = ''; // show Quizz finish
  document.getElementById('questionBody').style = 'display: none'; // hide questionBody
  document.getElementById('amount-of-question').innerHTML = questions.length;
  document.getElementById('amount-right-question').innerHTML = rightQuestions;
  document.getElementById('header-image').src = 'img/win.jpg';
}

function addAudioScore() {
  if (rightQuestions > 5) {
    AUDIO_WIN.play();
  } else {
    AUDIO_LOST.play();
  }
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length; // Show the percent
  percent = Math.round(percent * 100);
  document.getElementById('progress-bar').innerHTML = `${percent}%`;
  document.getElementById('progress-bar').style = `width: ${percent}%`;
  document.getElementById('number-question').innerHTML = currentQuestion + 1;
}

function updateToNextQuestion() {
  let question = questions[currentQuestion]; // The first question from JSON (0)
  document.getElementById('questiontext').innerHTML = question['question']; // Show the question from JSON (0)
  document.getElementById('answer_1').innerHTML =
    questions[currentQuestion]['answer_1']; // Show the answer from JSON (0)
  document.getElementById('answer_2').innerHTML =
    questions[currentQuestion]['answer_2']; // Show the answer from JSON (0)
  document.getElementById('answer_3').innerHTML =
    questions[currentQuestion]['answer_3']; // Show the answer from JSON (0)
  document.getElementById('answer_4').innerHTML =
    questions[currentQuestion]['answer_4']; // Show the answer from JSON (0)
}
function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1); // Get the last character of string answer_2 = 2
  let idOfRightAnswer = `answer_${question['right_answer']}`;

  if (rightAnswerSelectet(selectedQuestionNumber, question)) {
    // 1=1; 2=2 ; 3=3; 4=4 Right answer
    document.getElementById(selection).parentNode.classList.add('bg-success'); // Give the right answer class: color green; Getting the parent div of element .parentNode;
    rightQuestions++;
    AUDIO_SUCCESS.play();
  } else {
    document.getElementById(selection).parentNode.classList.add('bg-danger'); // Give the false answer class: color red;
    document
      .getElementById(idOfRightAnswer)
      .parentNode.classList.add('bg-success'); // Give the right answer class: color green;
    AUDIO_FAIL.play();
  }
  document.getElementById('next-button').disabled = false; // Botton einable
}

function rightAnswerSelectet(selectedQuestionNumber, question) {
  return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
  currentQuestion++; // from 0 to 1; from 1 to 2 etc...
  document.getElementById('next-button').disabled = true;
  resetAnswerButton();
  showQuestion();
}

function resetAnswerButton() {
  document.getElementById('answer_1').parentNode.classList.remove('bg-danger'); // remove the color red from the first answer
  document.getElementById('answer_1').parentNode.classList.remove('bg-success'); // // remove the color green from the first answer
  document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_2').parentNode.classList.remove('bg-success');
  document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_3').parentNode.classList.remove('bg-success');
  document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
  document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
  document.getElementById('header-image').src = 'img/pencil.jpg'; // Change the picture
  document.getElementById('endScreen').style = 'display: none'; // Endscreen hide
  document.getElementById('questionBody').style = ''; // Endscreen show
  rightQuestions = 0; // Restart the rightQuestuion to 0
  currentQuestion = 0; // Restart the currentQuestion to 0
  init();
}
