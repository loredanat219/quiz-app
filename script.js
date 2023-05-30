// Define the quiz questions and choices as an array of objects
var quizQuestions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Jupiter", "Saturn", "Mercury"],
      correctAnswer: "Mars",
    },
    {
      question: "What is the largest ocean in the world?",
      choices: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
      correctAnswer: "Pacific Ocean",
    },
  ];
  
  var currentQuestion = 0; // Tracks the index of the current question
  var score = 0; // Tracks the user's score
  var isAnswerSelected = false; // Tracks if an answer is selected
  
  // Function to load and display the current question and choices
  function loadQuestion() {
    var questionElement = document.getElementById("question");
    var choicesElement = document.getElementById("choices");
    var submitButton = document.getElementById("submit-btn");
  
    // Clear previous question and choices
    questionElement.textContent = "";
    choicesElement.innerHTML = "";
  
    // Load the current question and choices
    var currentQuizQuestion = quizQuestions[currentQuestion];
    questionElement.textContent = currentQuizQuestion.question;
  
    currentQuizQuestion.choices.forEach(function (choice) {
      var li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", selectAnswer); // Add event listener to each choice
      choicesElement.appendChild(li);
    });
  
    // Disable the submit button until an option is selected
    submitButton.disabled = true;
  
    // Reset answer selection status
    isAnswerSelected = false;
  }
  
  // Function to handle user selection and check the answer
  function selectAnswer(event) {
    if (!isAnswerSelected) {
      var selectedChoice = event.target;
      var currentQuizQuestion = quizQuestions[currentQuestion];
  
      // Highlight selected choice
      var choices = document.getElementById("choices").getElementsByTagName("li");
      for (var i = 0; i < choices.length; i++) {
        choices[i].classList.remove("selected");
      }
      selectedChoice.classList.add("selected");
  
      // Check if the selected choice is the correct answer
      if (selectedChoice.textContent === currentQuizQuestion.correctAnswer) {
        score++;
      }
  
      // Enable the submit button
      var submitButton = document.getElementById("submit-btn");
      submitButton.disabled = false;
  
      // Update answer selection status
      isAnswerSelected = true;
    }
  }
  
  // Function to handle the submission of the answer
  function submitAnswer() {
    if (isAnswerSelected) {
      // Move to the next question
      currentQuestion++;
  
      // Check if the quiz has ended
      if (currentQuestion === quizQuestions.length) {
        endQuiz();
      } else {
        loadQuestion();
      }
  
      // Reset answer selection status
      isAnswerSelected = false;
    }
  }
  
  // Function to handle the end of the quiz
  function endQuiz() {
    var quizContainer = document.querySelector(".quiz-container");
    var questionElement = document.getElementById("question");
    var choicesElement = document.getElementById("choices");
    var submitButton = document.getElementById("submit-btn");
  
    // Hide the question and choices
    questionElement.style.display = "none";
    choicesElement.style.display = "none";
    submitButton.style.display = "none";
  
    // Display the final score
    var resultElement = document.createElement("p");
    resultElement.textContent = "Your score: " + score + " out of " + quizQuestions.length;
    quizContainer.appendChild(resultElement);
  }
  
  // Event listener for submit button click
  document.getElementById("submit-btn").addEventListener("click", submitAnswer);
  
  // Load the first question when the page loads
  loadQuestion();
  