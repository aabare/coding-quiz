var timeLeft = document.querySelector("#timeLeft");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var score = 0;
var questionsIndex = 0;

var currentTime = 76;
var holdInterval = 0;
var deduction = 10;

var createUl = document.createElement("ul");


var questions = [
    {
        title: "Commonly used data types DO NOT inculde:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        title: "The condintion in an if/else statement is enclosed with ___________.",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "3. parenthesis"
    },
    {
        title: "Arrays in JavaScript can be used to store ____________.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        title: "String values must be enclosed within __________ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    },


];


timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            currentTime--;
            timeLeft.textContent = currentTime;

            if (currentTime <= 0) {
                clearInterval(holdInterval);
                finishQuiz();
                timeLeft.textContent = "You ran out of time!";
            }
        }, 1000);
    }
    wrapper.style.display = "none"; 
    render(questionsIndex);
});


function render(questionsIndex) {
    questionsDiv.innerHTML = "";
    createUl.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
    
        var usersQuestions = questions[questionsIndex].title;
        var usersChoices = questions[questionsIndex].choices;
        questionsDiv.textContent = usersQuestions;
    }
    usersChoices.forEach(function (newItem) {
        var liItem = document.createElement("li");
        liItem.textContent = newItem;
        questionsDiv.appendChild(createUl);
        createUl.appendChild(liItem);
        liItem.addEventListener("click", (check));
    })
}
function check(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionsIndex].answer) {
            score++;
            createDiv.textContent = "Correct!"
        } else {
            currentTime = currentTime - deduction;
            createDiv.textContent = "Wrong!"
        }

    }

    questionsIndex++;

    if (questionsIndex >= questions.length) {
        finishQuiz();
        createDiv.textContent = "You got " + score + " questions right!";
    } else {
        render(questionsIndex);
    }
    questionsDiv.appendChild(createDiv);

}

function finishQuiz() {
    questionsDiv.innerHTML = "";
    timeLeft.innerHTML = "";

    var finishedH1 = document.createElement("h1");
    finishedH1.setAttribute("id", "finishedH1");
    finishedH1.textContent = "You finished the quiz!"

    questionsDiv.appendChild(finishedH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    if (currentTime >= 0) {
        var timeRemaining = currentTime;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your Final Score Is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Please enter your name: ";

    questionsDiv.appendChild(createLabel);

    var addInput = document.createElement("input");
    addInput.setAttribute("type", "text");
    addInput.setAttribute("id", "name");
    addInput.textContent = "";

    questionsDiv.appendChild(addInput);

    var subInput = document.createElement("button");
    subInput.setAttribute("type", "submit");
    subInput.setAttribute("id", "Submit");
    subInput.textContent = "Submit";

    questionsDiv.appendChild(subInput);


    subInput.addEventListener("click", function () {
        var name = addInput.value;

        if (name === null) {


        } else {
            var finalScore = {
                name: name,
                score: timeRemaining
            }
            var totalScores = localStorage.getItem("totalScores");
            if (totalScores === null) {
                totalScores = [];
            } else {
                totalScores = JSON.parse(totalScores);
            }
            totalScores.push(finalScore);
            var newScore = JSON.stringify(totalScores);
            localStorage.setItem("totalScores", newScore);
            window.location.replace("highscores.html");
        }
    });

}