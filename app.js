/* eslint-disable no-undef */
/* eslint-disable indent */
'use strict';

const store = {
   questions: [
    {
      question: 'Which of the following actors played these roles: Elrond - "Lord of the rings", Agent Smith - "The Matrix", and Red Skull - "Captain America"?',
      answers: [
        'Tom Arnold',
        'Wesley Snipes',
        'Hugo Weaving',
        'Russell Brand'
      ],
      correctAnswer: 'Hugo Weaving'
    },
    {
      question: 'Which of the following actors played these roles: Zorg - "The Fifth Element", Detective/Commisioner Gordon - "(Nolan) Batman Trilogy", and Dracula - "Bram Stokers Dracula"?',
      answers: [
        'Christian Bale',
        'Sean Connery',
        'Andy Samberg',
        'Gary Oldman'
      ],
      correctAnswer: 'Gary Oldman'
    },
    {
      question: 'How many movie theaters did the original "Star Wars - A New Hope" originally premier at?',
      answers: [
        '32',
        '150',
        '4',
        'About half the screen nationwide'
      ],
      correctAnswer: '32'
    },
    {
      question: 'This actor has a career that spans over 60years, has starred in more than 20 Western films (such as Pale Rider and The Outlaw Josey Wales), as well as films about World War II and space. He is also a writer and director.',
      answers: [
        'Macaulay Culkin',
        'Clint Eastwood',
        'Tommy Lee Jones',
        'Melissa McCarthy'
      ],
      correctAnswer: 'Clint Eastwood'
    },
    {
      question: 'Who was the music composer for all 9 episodes of the "Star Wars" saga?',
      answers: [
        'Kanye West',
        'Garth Brooks',
        'John Williams',
        'Danny Elfman'
      ],
      correctAnswer: 'John Williams'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  incorrect: 0
};


/* TEMPLATE GENERATION FUNCTIONS */

function generateQuestionPage() {

  let question = store.questions[store.questionNumber];
  let answers = question.answers.map((answer, idx) =>{
    return `<input type="radio" id="answer${idx}" name="answer" value='${answer}' required>
    <label for='answer${idx}'>${answer}</label><br>`;
  });

  return `<div class='mainPage'>
  <div class='status'>Current Question: ${store.questionNumber + 1} out of 5</div>
  <div class='score'>Current Score: ${store.score}</div>
  <form id='question'>
    <h2>${question.question}</h2>
    ${answers.join(' ')}
    <button class='submit'>Submit Answer</button>
    </form>
  </div>`;
}

function generateStartPage() {
   return `<div class='mainPage'>
  <h2>Here we go!</h2>
  <h3>Try your best and have fun!</h3>
  <button id='startQuiz' type="button">Begin Quiz</button>
  </div>
  `;
}

function generateCorrectPage() {
   return `
  <div class='correctPage'>
  <h2>Yay! Great job!</h2>
  <p>Current Score: ${store.score}</p>
  <button id='nextQuestion' type="button">Next</button>
  </div>
  `;
  

}
function generateIncorrectPage() {
   return `
  <div class='incorrectPage'>
  <h2>Good try! But...</h2>
  <p>The correct answer was ${store.questions[store.questionNumber].correctAnswer}</p>
  <p>Current Score: ${store.score}</p>
  <button id='nextQuestion' type="button">Next</button>
  </div>
  `;
}

function generateEndPage() {
  return `
  <div class='finalPage'>
  <h2>All done! Let see how you did!</h2>
  <p>Your final score is ${store.score} with ${store.incorrect} incorrect! </p>
  <button id='startOver' type="button">Try again?</button>
  </div>
  `;
}

/********** RENDER FUNCTION(S) **********/

function render(quizPage) {
  let html = '';
  switch (quizPage) {
    case 'startPage':
      html = generateStartPage();
      break;
    case 'correctPage':
      html = generateCorrectPage();
      break;
    case 'incorrectPage':
      html = generateIncorrectPage();
      break;
    case 'finalPage':
      html = generateEndPage();
      break;
    default:
        html = generateQuestionPage();
  }
  $('main').html(html);
}


/* EVENT HANDLER FUNCTIONS */


function handleStartQuiz() {
  $('main').on('click', '#startQuiz', function() {
    store.quizStarted = true;
    render();
  });
}

function handleAnswerSubmit() {
  $('main').on('submit', '#question', function(event){
    event.preventDefault();
    let chosenAnswer = $('input[name=\'answer\']:checked').val();
    let correctAnswer = store.questions[store.questionNumber].correctAnswer;
    //compare against correct answer
    if (chosenAnswer === correctAnswer) {
      store.score++;
      render('correctPage');
    } else {
      store.incorrect++;
      render('incorrectPage');
    }
  });
}

function handleResetSubmit() {
  $('main').on('click', '#startOver', function(){
    store.quizStarted = false;
    store.score =0;
    store.questionNumber=0;
    store.incorrect=0;
    render('startPage');
   });
}

function handleNextQuestion() {
  $('main').on('click', '#nextQuestion', function (event) {
    store.questionNumber++;
    if (store.questionNumber === store.questions.length) {
      render('finalPage');
      } else {
        render();
      }
  });
}


// * main function *//

function main() {
  render('startPage');
  handleStartQuiz();
  handleAnswerSubmit();
  handleResetSubmit();
  handleNextQuestion();
}

$(main);