//set the starting time
var timer = 75;
var timeCount;
var HighScores = 0;

var clockElement = document.querySelector("#time");
var wrapperElement = document.querySelector(".wrapper");
var strtElement = document.querySelector("#start");
var divContEL = document.querySelector(".divContainer");
var hElement = document.querySelector("#question");
var oderListEl = document.querySelector("#q-list");
var finishDiv = document.querySelector(".finish-section");
var finalScore = document.querySelector("#result");
var errMsg = document.querySelector("#errorSmg");
var initialInput = document.querySelector("#inputInitial").value;
var submitEl = document.querySelector(".btn btn-primary mb-2");
var responsDiv = document.querySelector("#response");
var finaPageEl = document.querySelector(".final-page");
var initialAndScore = document.querySelector("#staticEmail");
var firstPageEl = document.querySelector(".first-page");
var viewHighScores = document.querySelector("#hscore");

// Create an  array of questions, choices, and answers
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        question: "There are 3 different ways in which a JavaScript code can be involved in an HTML file. Selct the one that's not correct.",
        choices: ["Inline", "Import", "External", "Internal"],
        answer: "Import",
    },
    {
        question: "How to create an array in js ?",
        choices: ["var A[]=", "var A{}=", "var A=[]", "var A={}"],
        answer: "var A=[]",
    },
    {   
        question: "HTML element that can be accessed in a Javascript code: Chose the one that will return an array of elements",
        choices: ["getElementById(‘idname’)", "getElementsByClass(‘classname’)", 
        "getElementsByTagName(‘tagname’)", "querySelectorAll()"],
        answer: "querySelectorAll()",
    }
];

//This is the timer that will reset the timer every time a quiz starts
function setupTimer() {
    timeCount = setInterval(function () {
        timer--;
        var timeReset = clockElement.textContent = "Time:" + " " + timer;
       timer = timer;
        if( timer <=0){
            clearInterval(timeCount);
            clockElement.textContent = timeReset;
        }
    }, 1000)
}

var questionIndex = 0;

// Sets up the timer and displays the quiz
function startQuiz() {
    wrapperElement.style.display = "none";
    setupTimer();
    displayQuestion();
}

// Handle when the user clicks a choice on a 
// question.
function handleButtonChoiceClick(event) {

    // check the timer, if the count is zero,
    // then the game is SOOO over.
    if(timer <= 0){
        clearInterval(timeCount);
        divContEL.style.display="none";
        displayResult();
    }

    // the target of this event will be a button
    // from the choices we displayed to the user.
    // get the answer text.
    var chosenButton = event.target;
    var answerText = chosenButton.textContent;

    // compare the answer text from the button the
    // the user clicked to the answer in the question.
    if (answerText === questions[questionIndex].answer) {
        responsDiv.setAttribute("style", "color: green")
        responsDiv.textContent = "Correct";
    } 
    else { 
        // for an incorrect answer, we subtract 15
        // seconds from the timer, in addition to 
        // telling them they did chose unwisely.
        responsDiv.setAttribute("style", "color: red")
        responsDiv.textContent = "Wrong";
        timer = timer - 15;
        function myPlay(){
            var audio = new Audio("sadtrambone.mp3");
            audio.play();
        };
        myPlay();
     }
    
    // check to see if there's another question,
    // then display it.
    if (questionIndex < questions.length-1) {
        questionIndex++;

        // awkward pause for displaying the next question
        setTimeout(function () {
            responsDiv.textContent = "";
            displayQuestion();
        }, 1000);

    }else { 
        // there are no more questions; time to end
        // the game.
        setTimeout(function () {
            responsDiv.textContent = "";
            displayResult();
            clearInterval(timeCount);
        }, 1000);
    
        // divContEL.innerHTML = '';
     }
}

// Display the user's final score and allow them
// to enter their initials for high score.
function displayResult() {
    // hide the question pane
    divContEL.style.display = "none";
    // show the 'game finished pane'
    finishDiv.style.visibility = "visible";

    clockElement.textContent = "Time:" + " " + timer;
    HighScores = timer;
}

//** This event listner submit the initial and final score to the local storage */
document.addEventListener("submit", function (event) {
    event.preventDefault();
    // var initialInput = document.querySelector("#inputInitial").value;
    // if (initialInput === "") {
    //     errMsg.setAttribute("style", "color: red")
    //     errMsg.textContent = "Initial input field cannot be empty"
    // } else {
    //     errMsg.textContent = "";
       
    // }
        // var yourHighScores = {
        //     yourInitial: initialInput,
        //     Score: HighScores
        //   };
          
        //   localStorage.setItem("yourHighScores", JSON.stringify(yourHighScores));
        //   finishDiv.textContent = "";
        //     var finaPageEl = document.querySelector(".final-page");
        //     finaPageEl.style.visibility = "visible";
        //     var initialScore = JSON.parse(localStorage.getItem("yourHighScores"));
        //     if (initialScore !== null) {
        //         initialAndScore = document.querySelector("#staticEmail");
        //       initialAndScore.value = initialScore.yourInitial + ":" + " " + initialScore.Score;
        //     }
        //     console.log(initialScore);
        //     console.log(yourHighScores);
       
        renderHighScores(event);

});


//render the localstorage to see the highScore with initial
function renderHighScores(event){
    event.preventDefault();
    
     initialInput = document.querySelector("#inputInitial").value;
    if (initialInput === "") {
        errMsg.setAttribute("style", "color: red")
        errMsg.textContent = "Initial input field cannot be empty"
    } else {
        errMsg.textContent = "";
       
    }
    var yourHighScores = {
            yourInitial: initialInput,
            Score: HighScores
          };
          
          localStorage.setItem("yourHighScores", JSON.stringify(yourHighScores));
          finishDiv.textContent = "";
            var finaPageEl = document.querySelector(".final-page");
            finaPageEl.style.visibility = "visible";
            var initialScore = JSON.parse(localStorage.getItem("yourHighScores"));
            if (initialScore !== null) {
                initialAndScore = document.querySelector("#staticEmail");
              initialAndScore.value = initialScore.yourInitial + ":" + " " + initialScore.Score;
            }
            

            // viewHighScores.addEventListener("click", function(event){
            //     // event.preventDefault();
            // //     // divContEL.style.display= "none";
            // //     // wrapperElement.style.display = "none"; 
            // //     // renderHighScores();
            // //     // divContEL.value = initialAndScore.value;
            // //     // alert(initialAndScore.value);
            // //     // alert("Your initials are: " + initialScore + " your score is: " + yourHighScores);
            // //     // alert(yourHighScores.yourInitial);
            // //     // alert(yourHighScores.Score);
            //     alert("Your total score is: " + yourHighScores.Score + "your initials are: " + yourHighScores.yourInitial);            
            // });

}
/**This function will refresh the page and send user back to begining page when go back button is clicked */
function init() {
     location.reload();
 
}
/**This function will  clear initial and score displayed on the final page */
function clearScore() {
    initialAndScore.value = "";
}




 // Display the next question
function displayQuestion() {

    // clean up - remove the previous question text 
    // and it's choices
    oderListEl.innerHTML = '';

    // get the current question (as given by i)
    var currentQuestion = questions[questionIndex];
    hElement.textContent = currentQuestion.question;

    // create the choices for the user. each choice is
    // a button with a handler wrapped in a list element
    // <li class="all_li">
    //    <button class="all_btn" click="onclickHandler()">choice text</button>
    // </li>
    currentQuestion.choices.forEach((choice) => {
        var liTag = document.createElement("li");
        liTag.setAttribute("class", "all_li");

        var btn = document.createElement('button');
        btn.setAttribute('class', 'all_btn');
        btn.textContent = choice;
        btn.addEventListener("click", handleButtonChoiceClick);

        liTag.appendChild(btn);
        oderListEl.appendChild(liTag);
    });
}

function scores(){
    
        divContEL.style.display= "none";
        wrapperElement.style.display = "none"; 
        finaPageEl.style.visibility = "visible";
    // //     // renderHighScores();
    // //     // divContEL.value = initialAndScore.value;
    // //     // alert(initialAndScore.value);
    // //     // alert("Your initials are: " + initialScore + " your score is: " + yourHighScores);
    var techStack = localStorage.getItem("yourHighScores");

     if (techStack !== null) {
      document.querySelector("#staticEmail").value = techStack;
    }

}
   


 