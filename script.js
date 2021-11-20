//Setting variations for later use
var buttonStart = document.querySelector(".start-button");
var timeEl = document.querySelector(".time");
var div1 = document.querySelector(".div1");
var div2 = document.getElementById("div2");
var button = document.querySelector(".start-button");
var QuestionSectionEl = document.querySelector("#QuestionSection");
//List of multiple Choice Questions
let score = 0;
let currentQuestion = 0;

let timerInterval

let highScores = []

showHighScores()

var QuestionsList = [
    {
     question: "In Javascript",
     choiceA: "a) a variable can only be used once",
     choiceB: "b) a variable is any letter in any form",
     choiceC: "c)a variable stores the data value that can be changed later",
     choiceD: "d) a variable stores the name of your html page",
     Answer: "c)a variable stores the data value that can be changed later",
    },
    {
        question: " An array is: ",
        choiceA: "a) a single variable that is used to store different elements",
        choiceB: "b) a to-do list",
        choiceC: "c) a list of different numbers",
        choiceD: "d) a shopping list",
        Answer: "a) a single variable that is used to store different elements",
    },
    {
        question: "A set of statements that performs a task or calculates a value is also known as: ",
        choiceA: "a) integer",
        choiceB: "b) true/false statements",
        choiceC: "c) API",
        choiceD: "d) a function",
        Answer: "d) a function",
    },
    {
        question: " A Boolean  ",
        choiceA: "a) can only be used with numbers",
        choiceB: "b) can only be used in either true or false statements",
        choiceC: "c) can only be used in arrays",
        choiceD: "d) can not be used",
        Answer: "b) can only be used in either true or false statements",
    },
]
//setting attributes to html elements
div1.setAttribute("style", "font-size: 25px",);

//seconds left on timer (start: 50s)
var secondsLeft = 50;
//Event at button start, should run the quiz and start the timer
buttonStart.addEventListener("click", function() {
   buttonStart.style.display = "none";
  div1.textContent = "Time Left: " + secondsLeft;
        timerInterval = setInterval(function() {
          secondsLeft--;
          div1.textContent = "Time Left: " + secondsLeft;
      
          if(secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
          }
      
        }, 1000)
        //Should display first question
        DisplayQuestion()
  });

  document.getElementById("try-again").addEventListener("click", function() {
    document.getElementById("high_scores").classList.add("hidden")
    secondsLeft = 50
   div1.textContent = "Time Left: " + secondsLeft;
         timerInterval = setInterval(function() {
           secondsLeft--;
           div1.textContent = "time left " + secondsLeft;
       
           if(secondsLeft === 0) {
             clearInterval(timerInterval);
             //sendMessage();
           }
       
         }, 1000)
         //Should display first question
         DisplayQuestion()
   });
  // function with question 1 and add event listeners plus runs CheckQuestion function
 function DisplayQuestion(){

    QuestionSectionEl.innerHTML = ""

   var QuestionTitleEl = document.createElement("h1")
   var Choice1 = document.createElement("button")
   Choice1.textContent = QuestionsList[currentQuestion].choiceA
   Choice1.addEventListener("click", CheckQuestion)
   var Choice2 = document.createElement("button")
   Choice2.textContent = QuestionsList[currentQuestion].choiceB
   Choice2.addEventListener("click", CheckQuestion)
   var Choice3 = document.createElement("button")
   Choice3.textContent = QuestionsList[currentQuestion].choiceC
   Choice3.addEventListener("click", CheckQuestion)
   var Choice4 = document.createElement("button")
   Choice4.textContent = QuestionsList[currentQuestion].choiceD
   Choice4.addEventListener("click", CheckQuestion)
   QuestionTitleEl.textContent = QuestionsList[currentQuestion].question
   QuestionSectionEl.appendChild(QuestionTitleEl)
   QuestionSectionEl.appendChild(Choice1)
   QuestionSectionEl.appendChild(Choice2)
   QuestionSectionEl.appendChild(Choice3)
   QuestionSectionEl.appendChild(Choice4)
 }
  function CheckQuestion(){

    document.getElementById("div2").classList.remove("hidden")
    console.log(QuestionsList[currentQuestion].Answer)
   if (this.innerHTML === QuestionsList[currentQuestion].Answer){
       console.log("correct")
        score++
        div2.textContent = "Correct!";
       
   }else{

   div2.textContent = "Incorrect";
   console.log("incorrect");   
   }

   setTimeout(function() {
    document.getElementById("div2").classList.add("hidden")
   }, 1000)



   currentQuestion++
   if (currentQuestion === QuestionsList.length) {
     //stop the timer
     clearInterval(timerInterval);
     //Remove contents of questions div
     QuestionSectionEl.innerHTML = ""

     //Show the div with the name prompt
     let element = document.getElementById("submit_score")
     element.classList.remove("hidden")

    //Prompt user for their initials

    //Show user's score
    document.getElementById("your_score").innerText = score

   } else {
    DisplayQuestion()
   }
   
 }

 function submitScore() {

    let player_name = document.getElementById("player_name").value
    let high_score_string = player_name + " " + score

    highScores.push(high_score_string);
    showHighScores()

    score = 0
    currentQuestion = 0

    //Rehide the submit score form
    document.getElementById("submit_score").classList.add("hidden")


    //show the high scores list
  document.getElementById("high_scores").classList.remove("hidden")

  document.getElementById("player_name").value = ""
 }

 function showHighScores() {

  document.getElementById("high_scores_list").innerHTML = ""

    for (let score of highScores) {

      let scoreElement = document.createElement("li")
      scoreElement.innerText = score
      document.getElementById("high_scores_list").appendChild(scoreElement)
    }

 }

 
