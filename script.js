// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("q-screen");
const resultScreen = document.getElementById("res-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("q-text");
const answersContainer = document.getElementById("opt-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("feedback");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
const nextButton = document.getElementById("next");
// const prevButton = document.getElementById("prev");
// const body = document.getElementById("body");

const quizQuestions = [
  {
    question: "What is the 3 multiplied by 14?",
    answers: [
      { text: "34", correct: false },
      { text: "43", correct: false },
      { text: "36", correct: false },
      { text: "52", correct: true },
    ],
  },
  {
    question: "Which country is in asia?",
    answers: [
      { text: "colombia", correct: false },
      { text: "portugal", correct: false },
      { text: "japan", correct: true },
      { text: "canada", correct: false },
    ],
  },
  {
    question: "What is a noun?",
    answers: [
      { text: "go", correct: false },
      { text: "tall", correct: false },
      { text: "gita", correct: true },
      { text: "shining", correct: false },
    ],
  },
  {
    question: "Which state is thiruvananthapuram located in?",
    answers: [
      { text: "karnataka", correct: false },
      { text: "telangana", correct: false },
      { text: "kerala", correct: true },
      { text: "tamil nadu", correct: false },
    ],
  },
  {
    question: "What is the best for agriculture?",
    answers: [
      { text: "sand", correct: false },
      { text: "red soil", correct: false },
      { text: "loamy soil", correct: true },
      { text: "clay", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
nextButton.addEventListener("click", nextQuestion);
prevButton.addEventListener("click", prevQuestion);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("opt");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("crct");
    } else if (button === selectedButton) {
      button.classList.add("icrct");
      body.style.background = "#ffbdbd";
      //   body.classList.add("wrong");
      setTimeout(() => {
        body.style.background = "#f0f8ff";
      }, 1000);
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  //   setTimeout(() => {
  //     currentQuestionIndex++;

  //     // check if there are more questions or if the quiz is over
  //     if (currentQuestionIndex < quizQuestions.length) {
  //       showQuestion();
  //     } else {
  //       showResults();
  //     }
  //   }, 1000);
}

function nextQuestion() {
  currentQuestionIndex++;

  // check if there are more questions or if the quiz is over
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// function prevQuestion() {

//     // check if there are more questions or if the quiz is over
//     if (currentQuestionIndex > 0) {
//         currentQuestionIndex--;
//         showQuestion();
//     }
//     // else {
//     //   showResults();
//     // }
//   }

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
