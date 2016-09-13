
// initialize quiz array of questions.
var quiz = [];
    // takes rawQuiz variable from questions.js file
for (var i = 0; i < rawQuiz0.length; i++) {
    quiz.push(new Question(rawQuiz0[i][0], rawQuiz0[i][1]));
}

var questionNumber = 0; // the number so far
var score = 0;

// Start button handler
$('#start').click(function(){
    $(this).remove();
    loadNextQuestion(quiz[questionNumber]);
});

/***********************
Functions
************************/

// question constructor
function Question (questionText, answerArr) {
    this.text = questionText;

    // answer constuctor
    function Answer (answerText) {
        this.text = answerText,
        this.correct = false;
    }

    var temp = [];
    for (var i = 0; i < answerArr.length; i++) {
        var answer = new Answer(answerArr[i]);
        if (i === 0) {
            answer.correct = true;
        }
        temp.push(answer);
    }
    this.answers = temp;
    this.trueAnswer = temp[0];
}

function loadNextQuestion(question) {
    // Error checking
    if (question === undefined) {
        console.log("no question object loaded");
        return;
    }

    clearQuestion();

    renderQuestionText(question);

    // Answer button click handler
    $(".answer").click(function () {
        checkAnswer($(this));
        loadNextQuestion(quiz[++questionNumber]);    
    });
} 

function renderQuestionText(question) {

    // load question text and update display number
    $('#theQuestion').html(question.text);
    $('#number').html(questionNumber + 1);

    // create array for ransom order
	let theOrder = [];
	while (theOrder.length < question.answers.length) {    
		var rand = Math.floor((Math.random() * question.answers.length));
		if (theOrder.indexOf(rand) === -1)
			theOrder.push(rand);
	}
    
    // insert the buttons
	for (let i = 0; i < question.answers.length; i++){
		$('#answerList').append('<li><button class="btn btn-lg btn-primary answer">' + question.answers[theOrder[i]].text + '</button></li>');
	}
}

function clearQuestion() {
    $('#theQuestion').empty();
    $('#answerList').empty();
}

// Pass in the answer button as jQuery object
function checkAnswer(buttonClicked) {
    if (buttonClicked.text() === quiz[questionNumber].trueAnswer.text) {
        score++;
        var myText = 'SCORE ' + score + '/' + quiz.length;
        $('#score').text(myText);
        return true;
    }
    else {
        return false;
    }
}