// Mines module (apenas move o script inline para arquivo dedicado)
(function(){
  let balance = 1000;
  let betAmount = 0;
  let mines = [];
  let revealed = [];
  let multiplier = 1;
  let gameActive = false;
  let bombsCount = 0;

  const grid = document.getElementById("grid");
  const balanceEl = document.getElementById("balance");
  const betInput = document.getElementById("bet");
  const bombsInput = document.getElementById("bombs");
  const startBtn = document.getElementById("startGame");
  const cashOutBtn = document.getElementById("cashOut");
  const logEl = document.getElementById("log");

  function log(msg) { const li = document.createElement("li"); li.textContent = msg; logEl.prepend(li); }

  function startGame() {
    betAmount = parseInt(betInput.value);
    bombsCount = parseInt(bombsInput.value);
    if (betAmount > balance) { alert("Saldo insuficiente!"); return; }
    balance -= betAmount; balanceEl.textContent = balance;
    mines = []; revealed = []; multiplier = 1; gameActive = true; cashOutBtn.disabled = false;
    while (mines.length < bombsCount) { const pos = Math.floor(Math.random() * 25); if (!mines.includes(pos)) mines.push(pos); }
    grid.innerHTML = "";
    for (let i = 0; i < 25; i++) { const cell = document.createElement("div"); cell.classList.add("cell"); cell.dataset.index = i; cell.onclick = () => reveal(i, cell); grid.appendChild(cell); }
    log(`🎮 Novo jogo iniciado com ${bombsCount} bombas. Aposta: ${betAmount}`);
  }

  function reveal(index, cell) {
    if (!gameActive || revealed.includes(index)) return;
    revealed.push(index);
    if (mines.includes(index)) { cell.classList.add("revealed", "mine"); cell.textContent = "💣"; log("💥 Você perdeu!"); gameActive = false; cashOutBtn.disabled = true; }
    else { cell.classList.add("revealed", "safe"); cell.textContent = "💎"; multiplier += 0.2; log(`💎 Diamante encontrado! Multiplicador: x${multiplier.toFixed(2)}`); }
  }

  async function cashOut() {
    if (!gameActive) return; const winnings = Math.floor(betAmount * multiplier);
    try{
      const resp = await fetch('/api/cashout/mines', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ amount: winnings, mult: multiplier }) });
      const data = await resp.json();
      if(data.ok){ balance = data.balance; balanceEl.textContent = balance; log(`💰 Você sacou ${winnings} créditos!`); }
      else { alert('Não foi possível sacar.'); }
    }catch(e){ alert('Erro ao comunicar com o servidor.'); }
    gameActive = false; cashOutBtn.disabled = true;
  }

  startBtn.onclick = startGame; cashOutBtn.onclick = cashOut;

  // Saldo em tempo real
  function toBRL(v){ return (v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
  async function refreshBalance(){
    try{ const r=await fetch('/api/user'); const d=await r.json(); balance = d.balance||balance; balanceEl.textContent = balance; }catch(e){}
  }
  refreshBalance();
  try{
    const sock = new SockJS('/ws-odds');
    const stomp = Stomp.over(sock); stomp.debug=()=>{};
    stomp.connect({}, ()=>{ stomp.subscribe('/topic/wins', ()=> refreshBalance()); });
  }catch(e){}
})();


