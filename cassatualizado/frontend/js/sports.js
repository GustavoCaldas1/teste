// vazio; mantido para consistência do projeto

const catMenu = document.querySelectorAll('.menu li');
const scoreboard = document.getElementById('scoreboard');
const oddsBox = document.getElementById('odds');
const ticketItems = document.getElementById('ticketItems');
const totalOddsEl = document.getElementById('totalOdds');
const stakeEl = document.getElementById('stake');
const estReturnEl = document.getElementById('estReturn');
const placeBetBtn = document.getElementById('placeBet');

let ticket = [];
let totalOdds = 1;

const mockMatches = {
  futebol: [
    { id:1, a:'Lux FC', b:'Neon SC', score:'1-0' },
    { id:2, a:'Golden United', b:'Tech Stars', score:'0-0' },
  ],
  basquete: [
    { id:3, a:'Blaze', b:'Falcons', score:'56-54' },
  ],
  mma: [
    { id:4, a:'R. Silva', b:'M. Santos', score:'R2 1:20' },
  ],
  tenis: [
    { id:5, a:'A. Freitas', b:'L. Costa', score:'6-4 3-2' },
  ],
};

function renderCat(cat='futebol'){
  catMenu.forEach(li => li.classList.toggle('active', li.dataset.cat===cat));

  // placar
  scoreboard.innerHTML = '';
  mockMatches[cat].forEach(m => {
    const row = document.createElement('div');
    row.className = 'match';
    row.innerHTML = `<span>${m.a} vs ${m.b}</span><strong>${m.score}</strong>`;
    scoreboard.appendChild(row);
  });

  // odds
  oddsBox.innerHTML = '';
  mockMatches[cat].forEach(m => addOddsRow(m));
}

function addOddsRow(match){
  const row = document.createElement('div');
  row.className = 'odd';
  const base = 1.5 + Math.random()*2;
  const a = (base + Math.random()).toFixed(2);
  const b = (base + Math.random()).toFixed(2);
  const draw = (base + Math.random()).toFixed(2);
  row.innerHTML = `
    <span>${match.a} vs ${match.b}</span>
    <div>
      <button class="btn btn-outline" data-odd="${a}" data-name="${match.a}">Casa ${a}</button>
      <button class="btn btn-outline" data-odd="${draw}" data-name="Empate">Empate ${draw}</button>
      <button class="btn btn-outline" data-odd="${b}" data-name="${match.b}">Fora ${b}</button>
    </div>`;
  oddsBox.appendChild(row);

  // live updates (simulado)
  setInterval(() => {
    const buttons = row.querySelectorAll('button');
    buttons.forEach(btn => {
      const newOdd = (parseFloat(btn.dataset.odd) + (Math.random()-.5)*0.2);
      btn.dataset.odd = Math.max(1.01, newOdd).toFixed(2);
      btn.textContent = btn.textContent.replace(/\d+\.\d+$/, btn.dataset.odd);
    });
  }, 3000);

  row.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      addToTicket({ match: `${match.a} vs ${match.b}`, pick: btn.dataset.name, odd: parseFloat(btn.dataset.odd) });
    });
  });
}

function addToTicket(sel){
  ticket.push(sel);
  renderTicket();
}

function renderTicket(){
  ticketItems.innerHTML = '';
  totalOdds = 1;
  ticket.forEach((t,i) => {
    const el = document.createElement('div');
    el.className = 'ticket-item';
    totalOdds *= t.odd;
    el.innerHTML = `<span>${t.match} — ${t.pick}</span><strong>${t.odd.toFixed(2)}</strong>`;
    ticketItems.appendChild(el);
  });
  totalOddsEl.textContent = totalOdds.toFixed(2);
  updateReturn();
}

function updateReturn(){
  const stake = parseFloat(stakeEl.value || '0');
  estReturnEl.textContent = (stake*totalOdds).toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
}

stakeEl.addEventListener('input', updateReturn);
placeBetBtn.addEventListener('click', () => {
  alert('Aposta registrada! (mock)');
});

catMenu.forEach(li => li.addEventListener('click', () => renderCat(li.dataset.cat)));
renderCat('futebol');
