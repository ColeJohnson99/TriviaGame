let questionslist = {};
let trivia = {};

let questions;
let answers = ["B", "D", "A", "B", "D", "A", "B", "D"];

let intervalID;

// Timer Object ========================================================================================================
timer = {

    time: 120,

    start: function () {
        $("#timer-display").text("02:00");
        intervalID = setInterval(timer.countdown, 1000);
    },

    countdown: function () {
        /*console.log("countdown");*/
        timer.time--;
        let currentTime = timer.timeConverter(timer.time);
        /*console.log(currentTime);*/
        $("#timer-display").text(currentTime);

        if (timer.time === 0) {
            $("#timer-display").text("Time's Up!");
            clearInterval(intervalID);
            $(".done, .question-block").hide();
            /*$(".question-block").hide();*/
            score();
            $(".results, .reset").show();
        } else {

        }
    },

    reset: function () {
        timer.time = 120;
        $("#timer-display").text("02:00");
        clearInterval(intervalID);
        /*console.log("Reset");*/
    },

    timeConverter: function (t) {
        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },

};


function startTrivia() {
    questionslist = resetQuestions();
    trivia = resetTrivia();

    showQuestions();

}

function resetTrivia() {
    return {
        correct: 0,
        incorrect: 0,
        blank: 0,
    }
}

function resetQuestions() {
    return {
        q0: {
            question: "Most consecutive 50 point games in the NBA?",
            A: "Yao Ming",
            B: "Wilt",
            C: "MJ",
            D: "Kareem",
        },
        q1: {
            question: "Most points in a quarter?",
            A: "Klay Thompson",
            B: "Tony Ferguson",
            C: "Kyrie Irving",
            D: "Steph Curry",
        },
        q2: {
            question: "Most blocks in a single game?",
            A: "Elmore Smith",
            B: "Manute Bol",
            C: "Bol Bol",
            D: "Rudy Gobert",
        },
        q3: {
            question: "Smallest ever NBA player?",
            A: "Mugsy Bogues",
            B: "Natte Robinson",
            C: "Luka Doncic",
            D: "Tyler Perry",
        },
        q4: {
            question: "First fighter to hold belts in seperate weight divisions?",
            A: "Connor McGregor",
            B: "Amanda Nunes.",
            C: "Holly Holms",
            D: "Randy Couture.",
        },
        q5: {
            question: "Fastest knockout in UFC history?",
            A: "Jorge Gamebred Mazvidal",
            B: "Cub Swanson",
            C: "Francis Ngannou",
            D: "Rose Namajunas",
        },
        q6: {
            question: "Current womens flyweight champion??",
            A: "Bill Lambieer",
            B: "Valentina Schevchenko",
            C: "Ronda Rousey",
            D: "Holly Holms",
        },
        q7: {
            question: "How many Twister submissions have been pulled off in the UFC?",
            A: "3",
            B: "2",
            C: "5",
            D: "Atleast one",
        }
    }
}

function showQuestions() {
    questions = Object.keys(questionslist);
    for (var i = 0; i < questions.length; i++) {
        var questiontitle = questions[i];
        var question = questionslist[questiontitle];
        var questionblocks = createQuestions(question, questiontitle);
        $(".question-block").append(questionblocks).show();
    }
}

function createQuestions(question, key) {
    var block = $("<div class='question' name='" + key + "'>" + question.question + "" +
        "<ul>" +
        "<li><input type='radio' name='" + key + "' value='A'><label>" + question.A + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='B'><label>" + question.B + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='C'><label>" + question.C + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='D'><label>" + question.D + "</label></li>" +
        "</ul>");

    return block;
}

function score() {
    /*console.log($("input:radio[name='q0']:checked").val());*/
    let playeranswers = [$("input:radio[name='q0']:checked").val(),
        $("input:radio[name='q1']:checked").val(),
        $("input:radio[name='q2']:checked").val(),
        $("input:radio[name='q3']:checked").val(),
        $("input:radio[name='q4']:checked").val(),
        $("input:radio[name='q5']:checked").val(),
        $("input:radio[name='q6']:checked").val(),
        $("input:radio[name='q7']:checked").val()];

    console.log(playeranswers);
    console.log(answers);

    for (k = 0; k < questions.length; k++) {
        if (playeranswers[k] === undefined) {
            trivia.blank++;
        } else if (playeranswers[k] === answers[k]) {
            trivia.correct++;
        } else {
            trivia.incorrect++;
        }

    }

    $("#correct").text("Correct: " + trivia.correct);
    $("#incorrect").text("Incorrect: " + trivia.incorrect);
    $("#unanswered").text("Unanswered: " + trivia.blank);

    console.log(trivia.correct);
    console.log(trivia.incorrect);
    console.log(trivia.blank);
}

// Question Time =======================================================================================================

$(document).ready(function () {

    $(".start").on("click", function () {
        $(".start").hide();
        startTrivia();
        timer.start();
        $(".done").show();

    });

    $(".done").on("click", function () {
        score();
        $(".done, .question-block").hide();
        timer.reset();
        $(".results, .reset").show();
    });

    $(".reset").on("click", function () {
        $(".question-block").empty();
        $(".start").show();
        $(".reset, .results").hide();
        timer.reset();
    });
});