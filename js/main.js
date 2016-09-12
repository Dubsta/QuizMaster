
// initialize quiz array of questions.
var quiz = [];
    // takes rawQuiz variable from questions.js file
for (var i = 0; i < rawQuiz0.length; i++) {
    quiz.push(new Question(rawQuiz0[i][0], rawQuiz0[i][1]));
}

var questionNumber = 0; // the number so far
var currentAnswer;
var score = 0;
var answerPositionIndex = ['#zero', '#one', '#two', '#three'];

// button handler
$('#loadQuestion').click(function(){
    // !! Just for now !! 
    loadQuestion(quiz[questionNumber]);
    if (!questionNumber){
    	$('#loadQuestion').text('NEXT');
    }
    questionNumber++;
    $('#number').html(questionNumber);
});
$('#zero').click(function(){
    nextQuestion(0);
});
$('#one').click(function(){
    nextQuestion(1);
});
$('#two').click(function(){
    nextQuestion(2);
});
$('#three').click(function(){
    nextQuestion(3);
});


/***********************
Functions
************************/
function nextQuestion(num){
    var tempNum = $(answerPositionIndex[num]).attr('value');
    console.log(tempNum);
    if (tempNum == 0){
        score++;
        var myText = 'SCORE ' + score + '/' + rawQuiz0.length;
        $('#score').text(myText);
    }
    loadQuestion(quiz[questionNumber]);    
    questionNumber++;
    $('#number').html(questionNumber);
}

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


function loadQuestion(question) {
	// Error checking
    if (question === undefined) {
		console.log("no question object loaded");
		return;
	}

    // load question
    $('#theQuestion').html(question.text);


    // create array for ransom order
	let theOrder = [];
	while (theOrder.length < question.answers.length) {    
        // rand is in range 0 - 3
		var rand = Math.floor((Math.random() * question.answers.length));
		if (theOrder.indexOf(rand) === -1)
			theOrder.push(rand);
	}
    
    // insert the buttons
	for (let i = 0; i < question.answers.length; i++){
		$('#answerList').append('<li><button class="btn btn-lg btn-primary">' + question.answers[theOrder[i]].text + '</button></li>');
	}
}