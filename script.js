// redirect if not logged
const currentUser=localStorage.getItem("rev_current_user");
if(!currentUser){location.href="login.html";}

// show user
document.getElementById("userName").textContent="👋 "+currentUser;

document.getElementById("logoutBtn").onclick=()=>{
  localStorage.removeItem("rev_current_user");
  location.href="login.html";
};

// ===== DATA =====
const data={
  Mathematics:{
    Algebra:[
      {q:"Solve 2x+5=17",a:"x=6"},
      {q:"x^2+5x+6",a:"(x+2)(x+3)"}
    ]
  },
  Science:{
    Physics:[
      {q:"Define velocity",a:"Speed with direction"}
    ]
  }
};

const subjectSelect=document.getElementById("subjectSelect");
const topicSelect=document.getElementById("topicSelect");
const questionArea=document.getElementById("questionArea");

function populateSubjects(){
  Object.keys(data).forEach(s=>{
    const o=document.createElement("option");
    o.value=s;o.textContent=s;
    subjectSelect.appendChild(o);
  });
  populateTopics();
}

function populateTopics(){
  topicSelect.innerHTML="";
  Object.keys(data[subjectSelect.value]).forEach(t=>{
    const o=document.createElement("option");
    o.value=t;o.textContent=t;
    topicSelect.appendChild(o);
  });
  showQuestions();
}

function showQuestions(){
  questionArea.innerHTML="";
  const list=data[subjectSelect.value][topicSelect.value];
  list.forEach((it,i)=>{
    const card=document.createElement("div");
    card.className="question-card";
    card.innerHTML=`
      <div>Q${i+1}. ${it.q}</div>
      <button class="show-btn">Show Answer</button>
      <div class="answer">${it.a}</div>
    `;
    const b=card.querySelector(".show-btn");
    const a=card.querySelector(".answer");
    b.onclick=()=>{
      a.style.display=a.style.display==="block"?"none":"block";
    };
    questionArea.appendChild(card);
  });
}

subjectSelect.onchange=populateTopics;
topicSelect.onchange=showQuestions;
populateSubjects();
