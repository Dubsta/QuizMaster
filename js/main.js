
/***********************
Globals
************************/
var questionNumber = 0; 
var score = 0;
var quiz = [];
var fadeDuration = 500;

/***********************
Main program flow
************************/

// insert questions.js into quiz[] as Question objects
var targetQuiz = rawQuiz0;
for (var i = 0; i < targetQuiz.length; i++) {
    quiz.push(new Question(targetQuiz[i][0], targetQuiz[i][1]));
}
// update score board
$('#score').text('SCORE ' + score + '/' + quiz.length);

// Start button handler
$('#start').click(function(){
    $(this).remove();
    $('#wholeQuestion').fadeOut(fadeDuration, function () {
        loadNextQuestion(quiz[questionNumber]); 
    });
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

    // check for end of quiz
    if (questionNumber >= quiz.length) {
        endQuiz();
        return;
    }
    // Error checking
    if (question === undefined) {
        console.log("no question object loaded");
        return;
    }

    renderQuestionText(question);

    // Answer button click handler
    $(".answer").click(function () {
        $('.answer').prop('disabled', true);
        checkAnswer($(this));
        $('#wholeQuestion').fadeOut(fadeDuration, function () {
            loadNextQuestion(quiz[++questionNumber]); 
        });
    });
}


function renderQuestionText(question) {

    // load question text and update display number
    $('#theQuestion').html(question.text);
    $('#number').html(questionNumber + 1 + ". ");

    // create array for ransom order
	let theOrder = [];
	while (theOrder.length < question.answers.length) {    
		var rand = Math.floor((Math.random() * question.answers.length));
		if (theOrder.indexOf(rand) === -1)
			theOrder.push(rand);
	}
    
    // insert the buttons
    var myHtml = '';
	for (let i = 0; i < question.answers.length; i++){
		myHtml += '<li><button class="btn btn-lg btn-primary answer">' + question.answers[theOrder[i]].text + '</button></li>'
	}
    $('#answerList').html(myHtml);
    //$('#wholeQuestion').hide();
    $('#wholeQuestion').fadeIn(fadeDuration);
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

function endQuiz() {
    clearQuestion();
    $('#number').empty();
    var message = "Congratulations! You score is " + score + '/' + quiz.length;
    $('#theQuestion').html(message)
    $('#wholeQuestion').slideDown(fadeDuration);
    $('#score').slideUp(fadeDuration);
}