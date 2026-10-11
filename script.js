const questions = [
    {
        question: "What does JS stand for?",
        options: ["Java Style", "JavaScript", "Just Script", "Java Source"],
        answer: 1
    },
    {
        question: "Which keyword declares a variable in JS?",
        options: ["var", "let", "const", "All of above"],
        answer: 3
    },
    {
        question: "What will typeof [] return?",
        options: ["array", "object", "list", "undefined"],
        answer: 1
    },
    {
        question: "Which method adds element to end of array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: 0
    },
    {
        question: "What is the output: 2 + '2'?",
        options: ["4", "22", "NaN", "Error"],
        answer: 1
    },
    {
        question: "Which is NOT a JS data type?",
        options: ["String", "Boolean", "Float", "Symbol"],
        answer: 2
    },
    {
        question: "How to write comment in JS?",
        options: ["<!-- -->", "// comment", "# comment", "** comment **"],
        answer: 1
    },
    {
        question: "What does DOM stand for?",
        options: ["Document Object Model", "Data Object Model", "Digital Object Manager", "Document Oriented Method"],
        answer: 0
    },
    {
        question: "Which function parses string to integer?",
        options: ["parseInt()", "parseString()", "toInt()", "Number()"],
        answer: 0
    },
    {
        question: "Which event fires when button is clicked?",
        options: ["onhover", "onclick", "onchange", "onsubmit"],
        answer: 1
    }
];

// Shuffle questions
let shuffled = [...questions].sort(() => Math.random() - 0.5);

let currentQ = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const qCountEl = document.getElementById('q-count');
const timerEl = document.getElementById('timer');
const progressEl = document.getElementById('progress');
const nextBtn = document.getElementById('next-btn');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const finalScoreEl = document.getElementById('final-score');

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 30;
    timerEl.textContent = timeLeft;

    const q = shuffled[currentQ];
    questionEl.textContent = q.question;
    qCountEl.textContent = `${currentQ + 1}/${shuffled.length}`;
    progressEl.style.width = `${((currentQ + 1) / shuffled.length) * 100}%`;

    optionsEl.innerHTML = '';
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optionsEl.appendChild(btn);
    });

    nextBtn.style.display = 'none';
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showCorrectAnswer();
            nextBtn.style.display = 'block';
        }
    }, 1000);
}

function checkAnswer(selected, btn) {
    clearInterval(timer);
    const correct = shuffled[currentQ].answer;
    const buttons = optionsEl.querySelectorAll('button');

    buttons.forEach(b => b.disabled = true);

    if (selected === correct) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        buttons[correct].classList.add('correct');
    }

    nextBtn.style.display = 'block';
}

function showCorrectAnswer() {
    const correct = shuffled[currentQ].answer;
    const buttons = optionsEl.querySelectorAll('button');
    buttons.forEach(b => b.disabled = true);
    buttons[correct].classList.add('correct');
}

nextBtn.onclick = () => {
    currentQ++;
    if (currentQ < shuffled.length) {
        loadQuestion();
    } else {
        showResults();
    }
};

function showResults() {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    finalScoreEl.textContent = `${score}/${shuffled.length}`;
}

function restartQuiz() {
    currentQ = 0;
    score = 0;
    shuffled = [...questions].sort(() => Math.random() - 0.5);
    resultScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    loadQuestion();
}

// Start quiz
loadQuestion();