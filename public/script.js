const question = document.querySelector("#question");
const answer1 = document.querySelector("#answer1")
const answer2 = document.querySelector("#answer2")
const answer3 = document.querySelector("#answer3")
const answer4 = document.querySelector("#answer4")
const gameBoard = document.querySelector("#game-board");
const h2 = document.querySelector('h2');


function fillQuestionElements(data) {
    if (data.winner === true) {
        gameBoard.getElementsByClassName.display = 'none';
        h2.innerText = "WYGRAŁEŚ/AŚ!!!"
    }
    if (data.loser === true) {
        gameBoard.getElementsByClassName.display = 'none';
        h2.innerText = "Peszek. Spróbuj ponownie"
    }
    question.innerText = data.question;
    data.answers.forEach((el, index)=> {
        const answerEl = document.querySelector(`#answer${+index+1}`);
        answerEl.innerText = el
    })
    // for(const i in data.answers) {
    //     const answerEl = document.querySelector(`#answer${+i+1}`);
    //     answerEl.innerText = data.answers[i]
    // }
}

function showNextQuestion() {
    fetch('/question', {
        method: 'GET'
    }).then(data => {
        return data.json()
    }).then(data => {
        fillQuestionElements(data)
    })
}
showNextQuestion();

const goodAnswersSpan = document.querySelector('#good-answers')

function handleAnswerFeedBack(data) {
    goodAnswersSpan.innerText = data.goodAnswers;
    showNextQuestion();
}

function sendAnswer(answerIndex) {
    fetch(`/answer/${answerIndex}`, {
        method: 'POST'
    }).then(data => {
        return data.json()
    }).then(data => {
        handleAnswerFeedBack(data);
        console.log(data)
    })
}

const buttons = document.querySelectorAll('.answer-btn');
for(const button of buttons) {
    button.addEventListener('click', (e) => {
        const answerIndex = e.target.dataset.answer;
        sendAnswer(answerIndex);
    })
}

const tipDiv = document.querySelector('#tip')
function handleFriendsAnswer(data) {
    tipDiv.innerText = data.text
}

function callToAFriend() {
    fetch('/help/friend', {
        method: 'GET'
    }).then(data => {
        console.log(data)
        return data.json()
    }).then(data => {
        handleFriendsAnswer(data)
    })
}
document.querySelector("#callToAFriend").addEventListener('click', callToAFriend)

function handleHalfOnHalfAnswer(data) {
    if (typeof data.text === 'string') {
        tipDiv.innerText = data.text;
    } else {
        for (const button of buttons) {
            if(data.answersToRemove.indexOf(button.innerText) > -1) {
                button.innerText = "";

            }
        }
    }
}

function halfOnHalf() {
    fetch('/help/half', {
        method: 'GET'
    }).then(data => {
        console.log(data)
        return data.json()
    }).then(data => {
        handleHalfOnHalfAnswer(data)
    })
}
document.querySelector('#halfOnHalf').addEventListener('click', halfOnHalf)

function handleCrowdAnswer(data) {
    if (typeof data.text === 'string') {
        tipDiv.innerText = data.text;
    } else {
        data.chart.forEach((percent, index) => {
            buttons[index].innerText = `${buttons[index].innerText} : ${percent}%`
        })
    }
}

function questionToTheCrowd() {
    fetch('/help/crowd', {
        method: 'GET'
    }).then(data => {
        console.log(data)
        return data.json()
    }).then(data => {
        handleCrowdAnswer(data)
    })
}
document.querySelector('#questionToTheCrowd').addEventListener('click', questionToTheCrowd)