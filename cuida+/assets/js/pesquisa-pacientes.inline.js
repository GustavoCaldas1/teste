
    // Filtro de pesquisa nos cards
    document.querySelector('.search-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const term = document.getElementById('search-name').value.trim().toLowerCase();
      const status = document.getElementById('search-status').value;
      const ward = document.getElementById('search-ward').value;
      const cards = document.querySelectorAll('.patient-card');
      cards.forEach(card => {
        const name = card.dataset.name;
        const id = card.dataset.id;
        const st = card.dataset.status;
        const wd = card.dataset.ward;
        const matchTerm = term ? (name.includes(term) || id.includes(term)) : true;
        const matchStatus = status ? (st === status) : true;
        const matchWard = ward ? (wd === ward) : true;
        card.style.display = (matchTerm && matchStatus && matchWard) ? '' : 'none';
      });
    });

    // Aplicar termo vindo da URL (?search=)
    (function applyUrlSearch(){
      const params = new URLSearchParams(window.location.search);
      const q = params.get('search');
      if (q) {
        document.getElementById('search-name').value = q;
        document.querySelector('.search-form').dispatchEvent(new Event('submit'));
      }
    })();

    // Limpar filtros
    document.getElementById('clearFilters').addEventListener('click', function() {
      document.getElementById('search-name').value = '';
      document.getElementById('search-status').value = '';
      document.getElementById('search-ward').value = '';
      document.querySelector('.search-form').dispatchEvent(new Event('submit'));
    });

    // Navegação de ações (cards)
    document.querySelectorAll('.patient-card .btn-primary-sm').forEach(btn => {
      btn.addEventListener('click', function(e) {
        // redireciona já é o href
      });
    });

    // Remover UI de paginação por ora (grid/scroll)
  


    // Funcionalidade básica de pesquisa

    document.querySelector('.search-form').addEventListener('submit', function(e) {

      e.preventDefault();

      
      
      const name = document.getElementById('search-name').value;

      const id = document.getElementById('search-id').value;

      const status = document.getElementById('search-status').value;

      
      
      // Aqui você implementaria a lógica de pesquisa real

      console.log('Pesquisando:', { name, id, status });

      
      
      // Simular resultado de pesquisa

      alert('Pesquisa realizada! Verifique o console para ver os parâmetros.');

    });



    // Funcionalidade dos botões de ação

    document.querySelectorAll('.btn-view').forEach(btn => {

      btn.addEventListener('click', function(e) {

        e.preventDefault();

        const row = this.closest('tr');

        const patientName = row.querySelector('.patient-name').textContent;

        // Redirecionar para o perfil do paciente

        window.location.href = 'perfil-paciente.html';

      });

    });



    document.querySelectorAll('.btn-edit').forEach(btn => {

      btn.addEventListener('click', function(e) {

        e.preventDefault();

        const row = this.closest('tr');

        const patientName = row.querySelector('.patient-name').textContent;

        alert(`Editando dados do paciente: ${patientName}`);

      });

    });



    // Funcionalidade de paginação

    document.querySelectorAll('.pagination-btn').forEach(btn => {

      btn.addEventListener('click', function() {

        if (!this.disabled) {

          document.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));

          this.classList.add('active');

        }

      });

    });

  


    // Funcionalidade básica de pesquisa

    document.querySelector('.search-form').addEventListener('submit', function(e) {

      e.preventDefault();

      

      const name = document.getElementById('search-name').value;

      const id = document.getElementById('search-id').value;

      const status = document.getElementById('search-status').value;

      

      // Aqui você implementaria a lógica de pesquisa real

      console.log('Pesquisando:', { name, id, status });

      

      // Simular resultado de pesquisa

      alert('Pesquisa realizada! Verifique o console para ver os parâmetros.');

    });



    // Funcionalidade dos botões de ação

    document.querySelectorAll('.btn-view').forEach(btn => {

      btn.addEventListener('click', function(e) {

        e.preventDefault();

        const row = this.closest('tr');

        const patientName = row.querySelector('.patient-name').textContent;

        // Redirecionar para o perfil do paciente

        window.location.href = 'perfil-paciente.html';

      });

    });



    document.querySelectorAll('.btn-edit').forEach(btn => {

      btn.addEventListener('click', function(e) {

        e.preventDefault();

        const row = this.closest('tr');

        const patientName = row.querySelector('.patient-name').textContent;

        alert(`Editando dados do paciente: ${patientName}`);

      });

    });



    // Funcionalidade de paginação

    document.querySelectorAll('.pagination-btn').forEach(btn => {

      btn.addEventListener('click', function() {

        if (!this.disabled) {

          document.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));

          this.classList.add('active');

        }

      });

    });

  
