
    // Busca global
    (function(){
      const input = document.getElementById('global-search');
      input && input.addEventListener('keypress', function(e){
        if(e.key==='Enter'){ e.preventDefault(); const t=this.value.trim(); if(t) location.href=`pesquisa-pacientes.html?search=${encodeURIComponent(t)}`; }
      });
    })();

    // Simular envio de comentário
    document.getElementById('sendComment').addEventListener('click', function(){
      const ta = document.getElementById('newComment');
      if(!ta.value.trim()) return alert('Digite um comentário.');
      alert('Comentário enviado!');
      ta.value='';
    });

    // Preencher título via querystring se existir id
    (function(){
      const params = new URLSearchParams(location.search);
      const id = params.get('id');
      if (id) document.getElementById('alertTitle').textContent = `Alerta: ${id}`;
    })();
  
