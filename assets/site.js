
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const SQ=Math.sqrt(3);
function hexPts(x,y,s){return[...Array(6)].map((_,k)=>{const a=Math.PI/180*(60*k-30);return(x+s*Math.cos(a)).toFixed(1)+","+(y+s*Math.sin(a)).toFixed(1)}).join(" ")}

/* 허니비헥스 미니 판: 실제 게임 구역 색 + 꿀벌 7마리 (줄이 겹치지 않는 배치) */
(function(){
  const COL=["#f6c445","#f2a0b6","#9fd38a","#f39a5c","#8fc9e8","#c3a6e6","#e8d56b"];
  const M=3,S=19,cells=[];
  for(let q=-M;q<=M;q++)for(let r=-M;r<=M;r++){if(Math.abs(-q-r)<=M)cells.push({q,r})}
  const bees=[[-3,1],[-2,3],[-1,-1],[0,2],[1,-3],[2,0],[3,-2]];
  const isBee=(q,r)=>bees.some(b=>b[0]===q&&b[1]===r);
  const reg=c=>{let best=0,bd=99;bees.forEach((b,i)=>{const d=(Math.abs(c.q-b[0])+Math.abs(c.r-b[1])+Math.abs(-c.q-c.r+b[0]+b[1]))/2;if(d<bd){bd=d;best=i}});return best};
  const hh=document.getElementById("hh");if(!hh)return;hh.innerHTML=cells.map(c=>{const x=S*SQ*(c.q+c.r/2),y=S*1.5*c.r;
    return `<polygon points="${hexPts(x,y,S-1.2)}" fill="${COL[reg(c)]}" stroke="rgba(0,0,0,.08)" stroke-width="1"/>`+
      (isBee(c.q,c.r)?`<g transform="translate(${x},${y})"><ellipse rx="7" ry="5.4" fill="#3b2810"/><path d="M-2.6-5v10M2.2-5v10" stroke="#f6c445" stroke-width="2.2"/><ellipse cx="-2" cy="-6" rx="4" ry="2.6" fill="#fff" opacity=".85"/><ellipse cx="3" cy="-6" rx="4" ry="2.6" fill="#fff" opacity=".85"/></g>`:"")}).join("");
})();

/* 히어로 베틀 바탕: 날실·씨실이 엇갈려 엮인 천. 손가락·마우스가 지나가면 주황 실이 엮여 들었다 빠짐 */
(function(){
  const cv=document.getElementById("field");if(!cv)return;const cx=cv.getContext("2d");
  const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
  let W,H,S=18,dots=[],ink,thread,last=performance.now();
  function size(){const r=cv.getBoundingClientRect(),d=devicePixelRatio||1;W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0);
    S=W<600?15:18;dots=[];const rows=Math.ceil(H/S)+1,cols=Math.ceil(W/S)+1,r0=Math.floor(rows*.62);
    for(let i=0;i<rows;i++)for(let k=0;k<cols;k++){const weft=(i+k)%2===0,x=k*S,y=i*S;
      dots.push({x,y,weft,v:0,base:weft&&i===r0&&x>W*.42?Math.min(.95,(x/W-.42)*3):0})}
    theme()}
  function theme(){ink=css("--ink");thread=css("--thread")}
  function dash(d,col,a){const L=S*.4;cx.globalAlpha=a;cx.strokeStyle=col;cx.lineWidth=S*.34;cx.beginPath();
    if(d.weft){cx.moveTo(d.x-L,d.y);cx.lineTo(d.x+L,d.y)}else{cx.moveTo(d.x,d.y-L);cx.lineTo(d.x,d.y+L)}cx.stroke()}
  function draw(t){const dt=Math.min(64,t-last);last=t;cx.clearRect(0,0,W,H);cx.lineCap="round";
    for(const d of dots){d.v=Math.max(0,d.v-dt*.0006);dash(d,ink,d.weft?.07:.045);
      const a=Math.max(d.v,d.base);if(a>.01)dash(d,thread,a)}
    cx.globalAlpha=1;if(!reduce)requestAnimationFrame(draw)}
  function touch(e){const r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    for(const d of dots){if(!d.weft)continue;const q=Math.hypot((d.x-x)*.6,(d.y-y)*1.6);if(q<S*1.6)d.v=Math.min(.9,d.v+(1-q/(S*1.6))*.9)}
    if(reduce)draw(performance.now())}
  document.querySelector(".hero").addEventListener("pointermove",touch);
  matchMedia("(prefers-color-scheme:dark)").addEventListener("change",theme);
  new MutationObserver(theme).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
  addEventListener("resize",size);size();requestAnimationFrame(draw);
})();

/* 메일 주소 복사 */
document.getElementById("copy")?.addEventListener("click",async e=>{
  const b=e.currentTarget,t=document.getElementById("addr").textContent;
  try{await navigator.clipboard.writeText(t);b.textContent="복사했어요"}
  catch(_){const r=document.createRange();r.selectNodeContents(document.getElementById("addr"));const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent="선택했어요 · Ctrl+C"}
  setTimeout(()=>b.textContent="주소 복사",2200)});
