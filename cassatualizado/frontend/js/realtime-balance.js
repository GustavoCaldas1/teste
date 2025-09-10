// Realtime balance utility
(function(){
  function toBRL(v){ return (v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }

  async function fetchBalance(){
    try { const r = await fetch('/api/user'); const d = await r.json(); return Number(d.balance||0); } catch(e){ return null; }
  }

  function attachRealtimeBalance(spanId, opts){
    const el = document.getElementById(spanId);
    if(!el) return;
    const formatBRL = !!(opts && opts.formatBRL);
    const render = (v)=>{ if(v==null) return; el.textContent = formatBRL ? toBRL(v) : String(v); };

    fetchBalance().then(render);
    try{
      const sock = new SockJS('/ws-odds');
      const stomp = Stomp.over(sock); stomp.debug=()=>{};
      stomp.connect({}, ()=>{ stomp.subscribe('/topic/wins', async ()=>{ const v = await fetchBalance(); render(v); }); });
    }catch(e){}

    return { refresh: async ()=> { const v = await fetchBalance(); render(v); } };
  }

  window.attachRealtimeBalance = attachRealtimeBalance;
})();


