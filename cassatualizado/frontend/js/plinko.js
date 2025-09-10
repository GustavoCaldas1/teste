// Plinko module com presets e offscreen-canvas para pinos
(function(){
  const canvas = document.getElementById('pkCanvas');
  const ctx = canvas?.getContext('2d');
  if(!canvas || !ctx) return;

  const betEl = document.getElementById('pkBet');
  const rowsEl = document.getElementById('pkRows');
  const playBtn = document.getElementById('pkPlay');
  const cashBtn = document.getElementById('pkCashout');
  const payoutsEl = document.getElementById('pkPayouts');
  const presetEl = document.getElementById('pkPreset');
  const winEl = document.getElementById('pkWin');
  const balEl = document.getElementById('pkBalance');

  const PRESETS = {
    seguro:    { base:0.70, bonus:1.20, pow:2.6 },
    balanceado:{ base:0.65, bonus:1.75, pow:2.4 },
    alto:      { base:0.55, bonus:2.20, pow:2.2 },
  };

  let balls = [];
  let buckets = [];
  let pegs = [];
  let winnings = 0;
  let offscreen = null, offctx = null;

  function payoutFor(rows, idx, preset){
    const { base, bonus, pow } = preset;
    const half = rows/2;
    const edgeDist = Math.min(idx, rows - idx);
    const edgeWeight = 1 - (edgeDist / half);
    return base + Math.pow(edgeWeight, pow) * bonus;
  }

  function buildBoard(rows){
    pegs = [];
    const spacingX = 38;
    const spacingY = 32;
    for(let r=0;r<rows;r++){
      for(let c=0;c<=r;c++){
        const x = canvas.width/2 - (r*spacingX)/2 + c*spacingX;
        const y = 60 + r*spacingY;
        pegs.push({ x, y });
      }
    }
    const cols = rows+1;
    const preset = PRESETS[presetEl.value] || PRESETS.balanceado;
    buckets = Array.from({length: cols}, (_,i)=>({ x: (canvas.width/cols)*i + (canvas.width/cols)/2, m: payoutFor(rows, i, preset) }));
    payoutsEl.innerHTML = '';
    buckets.forEach(b=>{ const div = document.createElement('div'); div.className='cell'; div.textContent='x'+b.m.toFixed(2); payoutsEl.appendChild(div); });

    // desenha pinos uma vez em offscreen
    offscreen = document.createElement('canvas'); offscreen.width = canvas.width; offscreen.height = canvas.height; offctx = offscreen.getContext('2d');
    offctx.clearRect(0,0,offscreen.width, offscreen.height);
    offctx.fillStyle = '#0ff';
    pegs.forEach(p=>{ offctx.beginPath(); offctx.arc(p.x,p.y,5,0,Math.PI*2); offctx.fill(); });
  }

  function launchBall(){ const bet = +betEl.value || 1; const jitter=(Math.random()-.5)*2; balls.push({ x: canvas.width/2, y: 20, vx: jitter, vy: 0.5, bet }); }

  function step(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    if(offscreen) ctx.drawImage(offscreen,0,0); // pinta pinos do offscreen

    const PEG_R = 5, COLL_R = 8, REST=0.55, MAX_V=6.0;
    balls.forEach(ball=>{
      ball.vy += 0.15; ball.vx *= 0.993; ball.x += ball.vx; ball.y += ball.vy;
      ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(ball.x, ball.y, 5, 0, Math.PI*2); ctx.fill();
      pegs.forEach(p=>{
        const dx=ball.x-p.x, dy=ball.y-p.y, d=Math.hypot(dx,dy);
        if(d<COLL_R){ const nx=dx/(d||1), ny=dy/(d||1); const overlap = COLL_R-d; ball.x+=nx*overlap; ball.y+=ny*overlap; const dot=ball.vx*nx+ball.vy*ny; ball.vx=(ball.vx-2*dot*nx)*REST; ball.vy=(ball.vy-2*dot*ny)*REST; ball.vx+=(Math.random()-.5)*0.2; }
      });
      if(ball.x<8){ ball.x=8; ball.vx=Math.abs(ball.vx)*0.5; }
      if(ball.x>canvas.width-8){ ball.x=canvas.width-8; ball.vx=-Math.abs(ball.vx)*0.5; }
      const speed=Math.hypot(ball.vx,ball.vy); if(speed>MAX_V){ const s=MAX_V/speed; ball.vx*=s; ball.vy*=s; }
      if(ball.y>520){ const idx=Math.max(0,Math.min(buckets.length-1,Math.floor((ball.x/canvas.width)*buckets.length))); const mult=buckets[idx].m; const win=Math.max(0, Math.floor(ball.bet*mult)); winnings+=win; if(winEl) winEl.textContent = winnings; balls.splice(balls.indexOf(ball),1); }
    });
    requestAnimationFrame(step);
  }

  playBtn.onclick = ()=> launchBall();
  cashBtn.onclick = async ()=>{
    if(winnings>0){
      try {
        const resp = await fetch('/api/cashout/plinko', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ amount: winnings, mult: 1 }) });
        const data = await resp.json();
        if(data.ok){ alert('Você sacou '+winnings+' créditos!'); winnings=0; if(winEl) winEl.textContent = winnings; if(balEl && data.balance!==undefined) balEl.textContent = toBRL(data.balance); }
        else { alert('Não foi possível sacar.'); }
      } catch(e){ alert('Erro ao comunicar com o servidor.'); }
    }
  };

  buildBoard(+rowsEl.value);
  rowsEl.addEventListener('input', ()=> buildBoard(+rowsEl.value));
  presetEl?.addEventListener('change', ()=> buildBoard(+rowsEl.value));
  step();

  // Saldo em tempo real
  function toBRL(v){ return (v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
  async function refreshBalance(){
    try{ const r=await fetch('/api/user'); const d=await r.json(); if(balEl) balEl.textContent = toBRL(d.balance||0); }catch(e){ if(balEl) balEl.textContent='--'; }
  }
  refreshBalance();
  try{
    const sock = new SockJS('/ws-odds');
    const stomp = Stomp.over(sock); stomp.debug=()=>{};
    stomp.connect({}, ()=>{ stomp.subscribe('/topic/wins', ()=> refreshBalance()); });
  }catch(e){}
})();


