// Particles Background
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];
for(let i=0;i<100;i++){
  particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2+1,dx:(Math.random()-0.5)*0.5,dy:(Math.random()-0.5)*0.5});
}
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="rgba(88,166,255,0.6)";
    ctx.fill();
    p.x+=p.dx; p.y+=p.dy;
    if(p.x<0||p.x>canvas.width)p.dx*=-1;
    if(p.y<0||p.y>canvas.height)p.dy*=-1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
window.addEventListener("resize",()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});

// Multiplayer & AI Quiz
let aiQuestions = [
  {q:"Area of circle?",o:["πr²","2πr","r²","πd"],a:0},
  {q:"Speed formula?",o:["d/t","t/d","m×a","v×t"],a:0},
  {q:"Force formula?",o:["F=ma","d/t","F/A","m/v"],a:0},
  {q:"Density formula?",o:["m/v","v/m","F*d","d/t"],a:0}
];
let cur=0,score=0,time=15,timer;
function loadAIQuestion(){
  const q=aiQuestions[cur];
  document.getElementById("question").textContent=q.q;
  const optDiv = document.getElementById("options");
  optDiv.innerHTML="";
  q.o.forEach((t,i)=>{
    const b=document.createElement("button");
    b.textContent=t;
    b.onclick=()=>checkAIAnswer(i);
    optDiv.appendChild(b);
  });
  startTimer();
}
function checkAIAnswer(i){
  if(i===aiQuestions[cur].a) score++;
  document.getElementById("score").textContent="Score: "+score;
  nextAIQuestion();
}
function nextAIQuestion(){
  cur=(cur+1)%aiQuestions.length;
  if(cur===0) saveScore();
  loadAIQuestion();
}
function startTimer(){
  clearInterval(timer);
  time=15;
  const tEl=document.getElementById("timer");
  timer=setInterval(()=>{
    if(!tEl) return;
    tEl.textContent="Time: "+time;
    time--;
    if(time<0) nextAIQuestion();
  },1000);
}
function saveScore(){
  let player=document.getElementById("playerName")?.value || "Player";
  let board=JSON.parse(localStorage.getItem("board")||"[]");
  board.push({name:player,score:score});
  board.sort((a,b)=>b.score-a.score);
  localStorage.setItem("board",JSON.stringify(board.slice(0,10)));
}
function showBoard(){
  const ul=document.getElementById("board");
  if(!ul) return;
  ul.innerHTML="";
  let b=JSON.parse(localStorage.getItem("board")||"[]");
  b.forEach(s=>{
    const li=document.createElement("li");
    li.textContent=s.name+" - "+s.score;
    ul.appendChild(li);
  });
}
showBoard();

// Theme & Login
function toggleTheme(){
  document.body.classList.toggle("light");
  localStorage.setItem("theme",document.body.classList.contains("light")?"light":"dark");
}
(function(){if(localStorage.getItem("theme")==="light")document.body.classList.add("light");})();
function login(){
  const n=document.getElementById("name")?.value.trim();
  if(!n) return;
  localStorage.setItem("user",n);
  location.href="index.html";
}
(function(){
  const w=document.getElementById("welcome");
  if(w && localStorage.getItem("user")) w.textContent="Welcome "+localStorage.getItem("user");
})();
loadAIQuestion();
