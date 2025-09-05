// Estado simples em localStorage (mock)
const LuxStore = {
  get(key, def){ try{ return JSON.parse(localStorage.getItem(key)) ?? def; }catch(e){ return def; } },
  set(key, val){ localStorage.setItem(key, JSON.stringify(val)); },
};

// Bootstrap: usuário e carteira
(function bootstrap(){
  const user = LuxStore.get('user', { username: 'lux_user', balance: 5000, totalWon: 3200, totalLost: 1800 });
  LuxStore.set('user', user);
  const tx = LuxStore.get('tx', []);
  LuxStore.set('tx', tx);
})();

// Login
const form = document.getElementById('loginForm');
if(form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const username = fd.get('username');
    // Aqui você pode integrar com o backend Java (endpoint /api/login)
    LuxStore.set('user', { username, balance: 5000, totalWon: 3200, totalLost: 1800 });
    window.location.href = 'lobby.html';
  });
}

// Lobby
function initLobby(){
  const games = [
    { id:1, name:'Neon Slots', type:'slots', pop:'altas' },
    { id:2, name:'Royal Poker', type:'poker', pop:'altas' },
    { id:3, name:'Blackjack Elite', type:'blackjack', pop:'medias' },
    { id:4, name:'Roleta Lux', type:'roleta', pop:'altas' },
    { id:5, name:'Nova Slots', type:'slots', pop:'novas' },
    { id:6, name:'Speed Blackjack', type:'blackjack', pop:'altas' },
    { id:7, name:'Hold’em VIP', type:'poker', pop:'medias' },
    { id:8, name:'Roleta Turbo', type:'roleta', pop:'novas' },
    { id:9, name:'Sports Hub', type:'esportes', pop:'altas' },
  ];

  const grid = document.getElementById('gamesGrid');
  const search = document.getElementById('globalSearch');
  const btn = document.getElementById('searchBtn');
  const fTipo = document.getElementById('fTipo');
  const fPop = document.getElementById('fPop');
  const fLanc = document.getElementById('fLanc');

  const render = () => {
    grid.innerHTML = '';
    const query = (search?.value || '').toLowerCase();
    const res = games.filter(g => {
      const byQuery = !query || g.name.toLowerCase().includes(query);
      const byTipo = fTipo.value === 'todos' || g.type === fTipo.value;
      const byPop = fPop.value === 'todas' || g.pop === fPop.value;
      const byLanc = fLanc.value !== 'recentes' || g.pop === 'novas';
      return byQuery && byTipo && byPop && byLanc;
    });
    res.forEach(g => {
      const el = document.createElement('div');
      el.className = 'card';
      el.innerHTML = `
        <div class="thumb"></div>
        <div class="body">
          <h4>${g.name}</h4>
          <div class="meta">
            <span class="badge">${g.type}</span>
            <button class="btn btn-outline">Jogar</button>
          </div>
        </div>`;
      grid.appendChild(el);
    });
  };

  [btn, fTipo, fPop, fLanc].forEach(el => el?.addEventListener('input', render));
  search?.addEventListener('keydown', (e)=>{ if(e.key==='Enter') render(); });
  render();
}

// Profile
function initProfile(){
  const user = LuxStore.get('user');
  if(!user) return;

  document.getElementById('username').textContent = '@' + user.username;
  document.getElementById('accBalance').textContent = toBRL(user.balance);
  document.getElementById('totalWon').textContent = toBRL(user.totalWon);
  document.getElementById('totalLost').textContent = toBRL(user.totalLost);

  const tx = LuxStore.get('tx', []);
  const tbody = document.querySelector('#txTable tbody');
  tbody.innerHTML='';
  tx.slice(-10).reverse().forEach(t => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${new Date(t.ts).toLocaleString()}</td><td>${t.type}</td><td>${toBRL(t.amount)}</td><td>${t.note}</td>`;
    tbody.appendChild(tr);
  });

  const timeline = document.getElementById('timeline');
  const events = [
    'Conta criada',
    'Primeiro depósito realizado',
    'Primeira aposta esportiva',
    'Primeiro giro na Roleta de Bônus',
  ];
  timeline.innerHTML = '';
  events.forEach((ev, i) => {
    const li = document.createElement('li');
    li.textContent = `${ev} — ${i+1}d atrás`;
    timeline.appendChild(li);
  });
}

// Wallet
function initWallet(){
  const bal = document.getElementById('walletBalance');
  const updateBal = () => bal.textContent = toBRL(LuxStore.get('user').balance);
  updateBal();

  const commit = (type, amount, method) => {
    const user = LuxStore.get('user');
    user.balance += (type==='deposito'? amount : -amount);
    LuxStore.set('user', user);
    const tx = LuxStore.get('tx', []);
    tx.push({ ts: Date.now(), type, amount, note: method });
    LuxStore.set('tx', tx);
    updateBal();
  };

  document.getElementById('doDeposit').addEventListener('click', ()=> {
    const amt = +document.getElementById('depAmount').value;
    const method = document.getElementById('depMethod').value;
    if(amt>0){ commit('deposito', amt, method); alert('Depósito realizado!'); }
  });
  document.getElementById('doWithdraw').addEventListener('click', ()=> {
    const amt = +document.getElementById('wdAmount').value;
    const method = document.getElementById('wdMethod').value;
    const user = LuxStore.get('user');
    if(amt>0 && amt<=user.balance){ commit('saque', amt, method); alert('Saque solicitado!'); }
    else alert('Valor inválido.');
  });
}

function toBRL(v){ return v.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }); }
