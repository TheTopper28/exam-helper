const questions = [
  { q:"Area of circle?", o:["πr²","2πr","r²","πd"], a:0 },
  { q:"Speed formula?", o:["d/t","t/d","m×a","v×t"], a:0 },
  { q:"Pythagoras?", o:["a²+b²=c²","a+b=c","a²-b²","ab"], a:0 },
  { q:"Force formula?", o:["m×a","d/t","F/A","m/v"], a:0 },
  { q:"Density?", o:["m/v","v/m","F×d","d/t"], a:0 }
];

let current=0, score=0, time=10, timerInt;

function loadQuestion(){
  if(!document.getElementById("question")) return;
  const q=questions[current];
  document.getElementById("question").textContent=q.q;
  const opt=document.getElementById("options");
  opt.innerHTML="";
  q.o.forEach((t,i)=>{
    const b=document.createElement("button");
    b.textContent=t;
    b.onclick=()=>checkAnswer(i);
    opt.appendChild(b);
  });
  startTimer();
}

function checkAnswer(i){
  if(i===questions[current].a) score++;
  document.getElementById("score").textContent="Score: "+score;
}

function nextQuestion(){
  current=(current+1)%questions.length;
  loadQuestion();
}

function startTimer(){
  clearInterval(timerInt);
  time=10;
  const tEl=document.getElementById("timer");
  timerInt=setInterval(()=>{
    if(!tEl) return;
    tEl.textContent="Time: "+time;
    time--;
    if(time<0){ nextQuestion(); }
  },1000);
}

if(document.getElementById("question")) loadQuestion();

function addTopic(){
  const input=document.getElementById("topic");
  const text=input.value.trim();
  if(!text) return;
  let arr=JSON.parse(localStorage.getItem("topics")||"[]");
  arr.push(text);
  localStorage.setItem("topics",JSON.stringify(arr));
  input.value="";
  renderTopics();
}

function renderTopics(){
  const list=document.getElementById("list");
  if(!list) return;
  list.innerHTML="";
  let arr=JSON.parse(localStorage.getItem("topics")||"[]");
  arr.forEach(t=>{
    const li=document.createElement("li");
    li.textContent=t;
    list.appendChild(li);
  });
  const stats=document.getElementById("stats");
  if(stats) stats.textContent="Total chapters: "+arr.length;
}

renderTopics();

function toggleTheme(){
  document.body.classList.toggle("light");
  localStorage.setItem("theme",
    document.body.classList.contains("light")?"light":"dark");
}

(function(){
  if(localStorage.getItem("theme")==="light")
    document.body.classList.add("light");
})();

function login(){
  const name=document.getElementById("name").value.trim();
  if(!name) return;
  localStorage.setItem("user",name);
  location.href="index.html";
}

(function(){
  const w=document.getElementById("welcome");
  if(w && localStorage.getItem("user"))
    w.textContent="Welcome "+localStorage.getItem("user");
})();
