
// initialize quiz array of questions.
var quiz = [];
    // takes rawQuiz variable from questions.js file
for (var i = 0; i < rawQuiz0.length; i++) {
    quiz.push(new Question(rawQuiz0[i][0], rawQuiz0[i][1]));
}

var answerIndex = ['#zero', '#one', '#two', '#three'];

// button handler
$('#loadQuestion').click(function(){
    // !! Just for now !! 
    loadQuestion(quiz[0]);
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


function loadQuestion(question){
	if (question === undefined){
		console.log("no questionect loaded");
		return;
	}
	$('#theQuestion').html(question.text);
	for (let i = 0; i < question.answers.length; i++){
		$(answerIndex[i]).html(question.answers[i].text);
	}
}