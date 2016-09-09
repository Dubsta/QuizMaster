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