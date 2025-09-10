// Lobby module
(function(){
  function toBRL(v){ return v.toLocaleString('pt-BR', { style:'currency', currency:'BRL' }); }

  function initLobby(){
    const baseGames = [
      { id:1, name:'Neon Slots', type:'slots', pop:'altas' },
      { id:2, name:'Royal Poker', type:'poker', pop:'altas' },
      { id:3, name:'Blackjack Elite', type:'blackjack', pop:'medias' },
      { id:4, name:'Roleta Lux', type:'roleta', pop:'altas' },
      { id:5, name:'Nova Slots', type:'slots', pop:'novas' },
      { id:6, name:'Speed Blackjack', type:'blackjack', pop:'altas' },
      { id:7, name:"Hold’em VIP", type:'poker', pop:'medias' },
      { id:8, name:'Roleta Turbo', type:'roleta', pop:'novas' },
      { id:9, name:'Sports Hub', type:'esportes', pop:'altas' },
      { id:10, name:'Mines', type:'mines', pop:'altas', href:'mines.html' },
      { id:11, name:'Plinko Neon', type:'slots', pop:'novas', href:'plinko.html' },
      { id:12, name:'Crash', type:'slots', pop:'novas', href:'crash.html' },
    ];
    // Jogos personalizados via localStorage: [{ name, href, type, pop }]
    let customGames = [];
    try { customGames = JSON.parse(localStorage.getItem('customGames')) || []; } catch(e) { customGames = []; }
    const games = [...baseGames, ...customGames.map((g, i) => ({
      id: 1000 + i,
      name: g.name || 'Jogo Personalizado',
      type: (g.type || 'outros').toLowerCase(),
      pop: g.pop || 'novas',
      href: g.href || '#'
    }))];

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
      const frag = document.createDocumentFragment();
      res.forEach(g => {
        const el = document.createElement('div');
        el.className = 'card';
        const icon = {
          slots:'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm2 0V4h12v2H6zm2 4h2v4H8v-4zm4 0h2v4h-2v-4zm4 0h2v4h-2v-4z"/></svg>',
          poker:'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z"/></svg>',
          blackjack:'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10l3 5-8 15L4 7 7 2z"/></svg>',
          roleta:'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 9h7a8 8 0 0 1-7 7v-7zm-2 0V4a8 8 0 0 0-7 7h7z"/></svg>',
          mines:'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z"/></svg>',
          esportes:'<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6 8l6 3-3 8H4l2-11zM16 13l4 2-2 5h-4l2-7z"/></svg>'
        }[g.type] || '';
        el.innerHTML = `
          <div class="thumb"></div>
          <div class="body">
            <h4>${g.name}</h4>
            <div class="meta">
              <span class="badge badge-${g.type}">${icon}${g.type}</span>
              <button class="btn btn-outline">Jogar</button>
            </div>
          </div>`;
        const playBtn = el.querySelector('button');
        playBtn.addEventListener('click', ()=>{ if(g.href){ window.location.href = g.href; } });
        frag.appendChild(el);
      });
      grid.appendChild(frag);
    };

    [btn, fTipo, fPop, fLanc].forEach(el => el?.addEventListener('input', render));
    search?.addEventListener('keydown', (e)=>{ if(e.key==='Enter') render(); });
    render();

    // Ganhos em tempo real
    const winsList = document.getElementById('liveWinsList');
    const appendWin = (payload) => {
      const li = document.createElement('li');
      const when = new Date(payload.ts || Date.now()).toLocaleTimeString();
      const game = (payload.game || 'mines').toLowerCase();
      const icon = game==='mines'
        ? '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z"/></svg>'
        : '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="3"/><path d="M12 2a10 10 0 1 0 0 20"/></svg>';
      li.innerHTML = `<div class="chip-win chip-${game}">${icon}<span class="time">${when}</span> <strong>${payload.user || 'Jogador'}</strong> ganhou <strong>${toBRL(Number(payload.amount)||0)}</strong> em ${game}${payload.mult? ' (x'+Number(payload.mult).toFixed(2)+')':''}</div>`;
      winsList?.prepend(li);
      while(winsList && winsList.children.length>10){ winsList.removeChild(winsList.lastChild); }
    };

    // WebSocket STOMP -> /topic/wins
    if(window.Stomp && window.SockJS){
      try{
        const sock = new SockJS('/ws-odds');
        const stomp = Stomp.over(sock);
        stomp.reconnect_delay = 3000;
        stomp.debug = ()=>{};
        stomp.connect({}, ()=>{
          stomp.subscribe('/topic/wins', (msg)=>{
            try{ const data = JSON.parse(msg.body); appendWin(data); }catch(_){}
          });
        });
      }catch(e){ /* fallback logo abaixo */ }
    }

    // Fallbacks: BroadcastChannel e localStorage
    try{ const bc = new BroadcastChannel('mines-wins'); bc.onmessage=(ev)=>{ if(ev?.data?.type==='win') appendWin(ev.data); }; }catch(e){}
    window.addEventListener('storage', (e)=>{ if(e.key==='mines:lastWin'){ try{ const d=JSON.parse(e.newValue); if(d?.type==='win') appendWin(d);}catch(_){} } });
  }

  window.initLobby = initLobby;
  // Tema persistente
  (function(){
    const key='theme';
    const saved = localStorage.getItem(key);
    if(saved==='light') document.documentElement.classList.add('theme-light');
    const btn = document.getElementById('themeToggle');
    btn?.addEventListener('click', ()=>{
      const isLight = document.documentElement.classList.toggle('theme-light');
      localStorage.setItem(key, isLight? 'light':'dark');
    });
  })();
})();


