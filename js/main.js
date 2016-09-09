
// initialize quiz array of questions.
var quiz = [];
    // takes rawQuiz variable from questions.js file
for (var i = 0; i < rawQuiz0.length; i++) {
    quiz.push(new Question(rawQuiz0[i][0], rawQuiz0[i][1]));
}

/*
 Example question object

{
    text: "How many eggs in a dozen?"
    answers: 
    [
        {
            text: "12",
            correct: true   
        },
        {
            text: "6",
            correct: false
        }
    ]
}

*/
var answerIndex = ['#zero', '#one', '#two', '#three'];
$('#loadQuestion').click(function(){
	var myQestion = new Question("What is national language of Brasil?", ["Portugese", "Spanish", "Italian", "French"]);
	loadQuestion(myQestion);
});


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
function loadQuestion(obj){
	if (obj === undefined){
		console.log("no object loaded");
		return;
	}
	$('#theQuestion').html(obj.text);
	for (let i = 0; i < obj.answers.length; i++){
		$(answerIndex[i]).html(obj.answers[i].text);
	}
}