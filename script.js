
// ========================================
// ✏️ CREATOR SECTION (EDIT QUESTIONS HERE)
// ========================================

const examData = {
    "Mathematics": {
        "Algebra": [
            {
                question: "1. Solve: 2x + 5 = 15",
                options: ["A. 3", "B. 5", "C. 10", "D. 7"],
                answer: "Correct Answer: B. 5"
            }
        ]
    },

    "Science": {
        "Physics": [
            {
                question: "1. Unit of Force?",
                options: ["A. Joule", "B. Newton", "C. Watt", "D. Pascal"],
                answer: "Correct Answer: B. Newton"
            }
        ]
    }
};

// ========================================
// 🚫 DO NOT EDIT BELOW
// ========================================

const subjectSelect = document.getElementById("subjectSelect");
const topicSelect = document.getElementById("topicSelect");
const questionsContainer = document.getElementById("questionsContainer");

function loadSubjects() {
    subjectSelect.innerHTML = '<option disabled selected>Choose Subject</option>';

    Object.keys(examData).forEach(subject => {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    });

    topicSelect.innerHTML = '<option disabled selected>Choose Topic</option>';
    topicSelect.disabled = true;
}

function loadTopics() {
    const selectedSubject = subjectSelect.value;
    topicSelect.disabled = false;
    topicSelect.innerHTML = '<option disabled selected>Choose Topic</option>';

    Object.keys(examData[selectedSubject]).forEach(topic => {
        const option = document.createElement("option");
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });

    questionsContainer.innerHTML = "";
}

function loadQuestions() {
    questionsContainer.innerHTML = "";

    const subject = subjectSelect.value;
    const topic = topicSelect.value;
    const questions = examData[subject][topic];

    questions.forEach(q => {
        const box = document.createElement("div");
        box.className = "question-box";

        const questionText = document.createElement("h3");
        questionText.textContent = q.question;
        box.appendChild(questionText);

        const optionsDiv = document.createElement("div");
        optionsDiv.className = "options";

        q.options.forEach(option => {
            const opt = document.createElement("div");
            opt.className = "option";
            opt.textContent = option;
            optionsDiv.appendChild(opt);
        });

        box.appendChild(optionsDiv);

        const answerDiv = document.createElement("div");
        answerDiv.className = "answer";
        answerDiv.textContent = q.answer;
        box.appendChild(answerDiv);

        const btn = document.createElement("button");
        btn.textContent = "Show Answer";
        btn.onclick = () => {
            const visible = answerDiv.style.display === "block";
            answerDiv.style.display = visible ? "none" : "block";
            btn.textContent = visible ? "Show Answer" : "Hide Answer";
        };

        box.appendChild(btn);
        questionsContainer.appendChild(box);
    });
}

subjectSelect.addEventListener("change", loadTopics);
topicSelect.addEventListener("change", loadQuestions);

loadSubjects();

