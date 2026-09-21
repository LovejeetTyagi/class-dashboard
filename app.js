const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const TIMES = [
  ["09:30","10:30"],["10:30","11:30"],["11:30","12:30"],
  ["13:30","14:30"],["14:30","15:30"],["15:30","16:30"]
];

const C = (code, name, faculty, room="", type="Lecture", groups=[]) =>
  ({code,name,faculty,room,type,groups});

const schedule = {
  Monday: [
    {start:"09:30",end:"11:30", item:C("CI571","Computer Organisation & Architecture Lab","Dr. Shailendra Tripathi","Electronics Lab","Lab",["A1"])},
    {start:"11:30",end:"12:30", item:C("GE511","Indian Constitution & Traditional Knowledge","Dr. Riya Rana","BLT-01")},
    {start:"13:30",end:"14:30", item:C("CI512","Operating Systems and Systems Programming","Dr. Kapil Sharma")},
    {start:"14:30",end:"15:30", item:C("HS511","Organisation and Marketing Management","Dr. Rakhi Pandey","BLT-01")},
    {start:"15:30",end:"16:30", item:C("CI511","Computer Organisation and Architecture","Dr. Shailendra Tripathi")}
  ],
  Tuesday: [
    {start:"09:30",end:"11:30", item:C("CI571","Computer Organisation & Architecture Lab","Dr. Shailendra Tripathi","Electronics Lab","Lab",["A3"])},
    {start:"11:30",end:"12:30", item:C("SELF","Self Study","","","Self Study")},
    {start:"13:30",end:"14:30", item:C("CI512","Operating Systems and Systems Programming","Dr. Kapil Sharma")},
    {start:"14:30",end:"15:30", item:C("CI572","Operating Systems & Systems Programming Lab","Dr. Kapil Sharma","CS Lab-406","Lab",["A1A2","A1","A2"])},
    {start:"15:30",end:"16:30", item:C("CI573","Open Source Software Lab","Dr. Suman Saha","CS Lab-305","Lab",["A3A4","A3","A4"])}
  ],
  Wednesday: [
    {start:"09:30",end:"11:30", item:C("CI571","Computer Organisation & Architecture Lab","Dr. Shailendra Tripathi","Electronics Lab","Lab",["A4"])},
    {start:"11:30",end:"12:30", item:C("PH715","Computational Physics","Dr. Priyanka A. Jha","ALT-03")},
    {start:"13:30",end:"14:30", item:C("CI512","Operating Systems and Systems Programming","Dr. Kapil Sharma")},
    {start:"14:30",end:"15:30", item:C("HS511","Organisation and Marketing Management","Dr. Rakhi Pandey","BLT-01")},
    {start:"15:30",end:"16:30", item:C("CI511","Computer Organisation and Architecture","Dr. Shailendra Tripathi")}
  ],
  Thursday: [
    {start:"09:30",end:"11:30", item:C("CI572","Operating Systems & Systems Programming Lab","Dr. Kapil Sharma","CS Lab-406","Lab",["A3A4","A3","A4"])},
    {start:"09:30",end:"11:30", item:C("CI573","Open Source Software Lab","Dr. Suman Saha","CS Lab-305","Lab",["A1A2","A1","A2"])},
    {start:"11:30",end:"12:30", item:C("CI732","Machine Learning","Dr. Suman Saha")},
    {start:"13:30",end:"14:30", item:C("CI512","Operating Systems and Systems Programming","Dr. Kapil Sharma","", "Tutorial")},
    {start:"14:30",end:"15:30", item:C("HS511","Organisation and Marketing Management","Dr. Rakhi Pandey","BLT-01")},
    {start:"15:30",end:"16:30", item:C("CI511","Computer Organisation and Architecture","Dr. Shailendra Tripathi","BLT-01")}
  ],
  Friday: [
    {start:"09:30",end:"10:30", item:C("GE511","Indian Constitution & Traditional Knowledge","Dr. Riya Rana","BLT-01")},
    {start:"10:30",end:"11:30", item:C("PH715","Computational Physics","Dr. Priyanka A. Jha","ALT-03")},
    {start:"11:30",end:"12:30", item:C("GE511","Indian Constitution & Traditional Knowledge","Dr. Riya Rana","BLT-01")},
    {start:"13:30",end:"14:30", item:C("CI732","Machine Learning","Dr. Suman Saha")},
    {start:"14:30",end:"15:30", item:C("CI511","Computer Organisation and Architecture","Dr. Shailendra Tripathi","", "Tutorial")},
    {start:"15:30",end:"16:30", item:C("PH715","Computational Physics","Dr. Priyanka A. Jha","BLT-01")}
  ],
  Saturday: [
    {start:"09:30",end:"11:30", item:C("CI574","Information Security Lab","Dr. Suman Saha","CS Lab-406","Lab",["A3A4","A3","A4"])},
    {start:"09:30",end:"11:30", item:C("CI571","Computer Organisation & Architecture Lab","Dr. Shailendra Tripathi","Electronics Lab","Lab",["A2"])},
    {start:"11:30",end:"13:30", item:C("CI574","Information Security Lab","Dr. Suman Saha","CS Lab-406","Lab",["A1A2","A1","A2"])}
  ],
  Sunday: []
};

const groupSelect = document.getElementById("groupSelect");
const savedGroup = localStorage.getItem("labGroup");
if(savedGroup) groupSelect.value = savedGroup;
groupSelect.addEventListener("change", () => { localStorage.setItem("labGroup", groupSelect.value); render(); });

function mins(hm){ const [h,m]=hm.split(":").map(Number); return h*60+m; }
function nowMins(d=new Date()){ return d.getHours()*60+d.getMinutes(); }
function prettyTime(hm){
  let [h,m]=hm.split(":").map(Number), ap=h>=12?"PM":"AM"; h=h%12||12;
  return `${h}:${String(m).padStart(2,"0")} ${ap}`;
}
function durationText(minutes){
  if(minutes<=0) return "starting now";
  const h=Math.floor(minutes/60), m=minutes%60;
  return h ? `${h}h ${m}m` : `${m} min`;
}
function matchesGroup(item){
  if(!item.groups || !item.groups.length) return true;
  const g=groupSelect.value;
  return item.groups.includes(g) || (g==="A1A2" && item.groups.includes("A1A2")) ||
         (g==="A3A4" && item.groups.includes("A3A4"));
}
function visible(day){
  return (schedule[day]||[]).filter(x=>matchesGroup(x.item)).sort((a,b)=>mins(a.start)-mins(b.start));
}
function dateLabel(d){ return d.toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long",year:"numeric"}); }

function render(){
  const d=new Date(), day=DAYS[d.getDay()], current=nowMins(d), items=visible(day);
  document.getElementById("dateText").textContent=dateLabel(d);
  document.getElementById("timeText").textContent=d.toLocaleTimeString([], {hour:"numeric",minute:"2-digit"});
  document.getElementById("todayCount").textContent=`${items.length} classes`;

  let active=null, next=null;
  for(const x of items){
    if(current>=mins(x.start) && current<mins(x.end)){ active=x; break; }
    if(mins(x.start)>current && !next) next=x;
  }
  const currentCard=document.getElementById("currentCard");
  if(active){
    const remaining=mins(active.end)-current;
    currentCard.innerHTML=`<div class="status">🔴 Current lecture</div>
      <div class="subject">${active.item.name}</div>
      <div class="meta">${prettyTime(active.start)} – ${prettyTime(active.end)} · ${active.item.code}<br>
      ${active.item.faculty?`👨‍🏫 ${active.item.faculty}`:""}${active.item.room?` · 🏫 ${active.item.room}`:""}${active.item.type!=="Lecture"?` · ${active.item.type}`:""}</div>
      <div class="countdown">Ends in ${durationText(remaining)}</div>`;
  } else {
    currentCard.innerHTML=`<div class="status">🟢 No lecture right now</div>
      <div class="subject">${items.length ? "You are free right now." : "No classes scheduled."}</div>
      <div class="meta">${next?`Your next class is ${next.item.name}.`:"Nothing else is scheduled today."}</div>`;
  }

  const nextCard=document.getElementById("nextCard");
  nextCard.innerHTML=next?`<div class="next-label">⏭ Next class</div>
    <div class="next-subject">${next.item.name}</div>
    <div class="meta">${prettyTime(next.start)} – ${prettyTime(next.end)} · ${next.item.code}<br>
    ${next.item.faculty?`👨‍🏫 ${next.item.faculty}`:""}${next.item.room?` · 🏫 ${next.item.room}`:""}<br>
    Starts in ${durationText(mins(next.start)-current)}</div>`:
    `<div class="next-label">⏭ Next class</div><div class="empty">No more classes today.</div>`;

  document.getElementById("todayList").innerHTML=items.length?items.map(x=>{
    const s=mins(x.start), e=mins(x.end), done=current>=e, isCurrent=current>=s&&current<e;
    return `<div class="class-row ${isCurrent?"current":""} ${done?"done":""}">
      <div class="time">${prettyTime(x.start)}<br>– ${prettyTime(x.end)}</div>
      <div class="info"><strong>${isCurrent?"🔴 ":""}${x.item.name}</strong>
      <small>${x.item.code} · ${x.item.type}${x.item.faculty?` · ${x.item.faculty}`:""}${x.item.room?` · ${x.item.room}`:""}</small></div>
    </div>`;
  }).join(""):`<div class="empty">No classes scheduled for today.</div>`;

  document.getElementById("weekList").innerHTML=DAYS.slice(1).concat(["Saturday"]).filter((v,i,a)=>a.indexOf(v)===i).map(dayName=>{
    const arr=visible(dayName);
    return `<div class="day-card"><div class="day-title">${dayName}</div>${
      arr.length?arr.map(x=>`<div class="day-class"><strong>${prettyTime(x.start)}–${prettyTime(x.end)} · ${x.item.name}</strong><small>${x.item.code}${x.item.room?` · ${x.item.room}`:""}</small></div>`).join(""):`<div class="day-class">No class</div>`
    }</div>`;
  }).join("");
}

let deferredPrompt;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;document.getElementById("installBtn").classList.remove("hidden");});
document.getElementById("installBtn").addEventListener("click",async()=>{
  if(!deferredPrompt)return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt=null;
  document.getElementById("installBtn").classList.add("hidden");
});
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
render();
setInterval(render,30000);
