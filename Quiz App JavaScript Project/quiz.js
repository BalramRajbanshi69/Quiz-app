const questions = [
    {
        question:"Which is the longest river in the world?",
        answers:[
            {text:"Amazon river", correct : false},
            {text:"Nile river", correct : true},
            {text:"Yangtze river", correct : false},
            {text:"Mississipi-Missouri river", correct : false},
        ]
},
{
     question:"Which is the smallest country in the world?",
        answers:[
            {text:"Vatican City", correct : true},
            {text:"Bhutan", correct : true},
            {text:"Nepal", correct : false},
            {text:"Sri Lanka", correct : false},
        ]
},
{
     question:"Which is the largest desert in the world?",
        answers:[
            {text:"Antarctica ", correct : false},
            {text:"Sahara", correct : true},
            {text:"Gobi", correct : false},
            {text:"Kalahari", correct : false},
        ]
},
{
     question:"Which is the smallest continent in the world?",
        answers:[
            {text:"Asia", correct : false},
            {text:"Australia", correct : true},
            {text:"Arctic", correct : false},
            {text:"Africa", correct : false},
        ]
}
];

const questionElement = document.getElementById("question");
const answersBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
} 

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach((answer)=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextBtn.style.display = "none";
    while(answersBtn.firstChild){
        answersBtn.removeChild(answersBtn.firstChild);
    }

}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");

    }
    Array.from(answersBtn.children).forEach((button)=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
   });
nextBtn.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML =  `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextBtn.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();