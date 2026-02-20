// ===============================
// ✏️ EDIT HERE (CREATOR SECTION)
// ===============================

const examData = {
    
    // ===== SUBJECT 1 =====
    "Mathematics": {
        "Algebra": [
            "1. Solve: 2x + 5 = 15",
            "2. Expand: (a + b)^2",
            "3. Factorize: x^2 - 9"
        ],
        "Geometry": [
            "1. Define Pythagoras Theorem.",
            "2. Find area of a circle.",
            "3. What is the sum of angles in a triangle?"
        ]
    },

    // ===== SUBJECT 2 =====
    "Science": {
        "Physics": [
            "1. Define Newton's First Law.",
            "2. What is acceleration?",
            "3. State Ohm’s Law."
        ],
        "Chemistry": [
            "1. Define atom.",
            "2. What is pH scale?",
            "3. Balance: H2 + O2 → H2O"
        ]
    }

    // 👉 ADD MORE SUBJECTS HERE

};

// ===============================
// 🚫 DO NOT EDIT BELOW
// ===============================

const subjectSelect = document.getElementById("subjectSelect");
const topicSelect = document.getElementById("topicSelect");
const questionsContainer = document.getElementById("questionsContainer");

function loadSubjects() {
    for (let subject in examData) {
        let option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    }
    loadTopics();
}

function loadTopics() {
    topicSelect.innerHTML = "";
    let selectedSubject = subjectSelect.value;

    for (let topic in examData[selectedSubject]) {
        let option = document.createElement("option");
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    }
    loadQuestions();
}

function loadQuestions() {
    questionsContainer.innerHTML = "";
    let subject = subjectSelect.value;
    let topic = topicSelect.value;

    let questions = examData[subject][topic];

    questions.forEach(q => {
        let div = document.createElement("div");
        div.className = "question";
        div.textContent = q;
        questionsContainer.appendChild(div);
    });
}

subjectSelect.addEventListener("change", loadTopics);
topicSelect.addEventListener("change", loadQuestions);

loadSubjects();
