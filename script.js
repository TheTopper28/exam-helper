const data = {
  Math: {
    Algebra: [
      { q: "Solve: 2x + 3 = 7", a: "x = 2" },
      { q: "Value of x: x/2 = 5", a: "x = 10" }
    ],
    Mensuration: [
      { q: "Area of square with side 4?", a: "16" }
    ]
  },

  Science: {
    Physics: [
      { q: "Unit of force?", a: "Newton" }
    ],
    Biology: [
      { q: "Basic unit of life?", a: "Cell" }
    ]
  }
};

const subjectSelect = document.getElementById("subjectSelect");
const topicSelect = document.getElementById("topicSelect");
const container = document.getElementById("questionsContainer");

function loadSubjects() {
  subjectSelect.innerHTML = "";
  Object.keys(data).forEach(subject => {
    const opt = document.createElement("option");
    opt.value = subject;
    opt.textContent = subject;
    subjectSelect.appendChild(opt);
  });
  loadTopics();
}

function loadTopics() {
  topicSelect.innerHTML = "";
  const subject = subjectSelect.value;
  Object.keys(data[subject]).forEach(topic => {
    const opt = document.createElement("option");
    opt.value = topic;
    opt.textContent = topic;
    topicSelect.appendChild(opt);
  });
  loadQuestions();
}

function loadQuestions() {
  container.innerHTML = "";
  const subject = subjectSelect.value;
  const topic = topicSelect.value;
  const questions = data[subject][topic];

  questions.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const q = document.createElement("div");
    q.className = "question";
    q.textContent = `${index + 1}. ${item.q}`;

    const btn = document.createElement("button");
    btn.textContent = "Show Answer";

    const ans = document.createElement("div");
    ans.className = "answer";
    ans.textContent = item.a;

    btn.addEventListener("click", () => {
      ans.style.display = ans.style.display === "block" ? "none" : "block";
    });

    card.appendChild(q);
    card.appendChild(btn);
    card.appendChild(ans);
    container.appendChild(card);
  });
}

subjectSelect.addEventListener("change", loadTopics);
topicSelect.addEventListener("change", loadQuestions);

loadSubjects();
