
    // Dados para o gráfico de sinais vitais
    const chartData = {
      labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      datasets: [
        {
          label: 'Frequência cardíaca (BPM)',
          data: [75, 78, 80, 77, 82, 85, 83, 80],
          borderColor: '#dc2626',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          tension: 0.4
        },
        {
          label: 'Temperatura (°C)',
          data: [37.2, 37.0, 37.5, 37.3, 37.8, 38.0, 37.9, 37.7],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          tension: 0.4
        },
        {
          label: 'PA Sistólica (mmHg)',
          data: [120, 122, 125, 120, 128, 130, 128, 125],
          borderColor: '#7c3aed',
          backgroundColor: 'rgba(124, 58, 237, 0.1)',
          tension: 0.4
        },
        {
          label: 'PA Diastólica (mmHg)',
          data: [80, 82, 85, 80, 88, 90, 88, 85],
          borderColor: '#ec4899',
          backgroundColor: 'rgba(236, 72, 153, 0.1)',
          tension: 0.4
        }
      ]
    };

    // Configuração do gráfico
    const ctx = document.getElementById('vitalsChart').getContext('2d');
    const vitalsChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 35,
            max: 140,
            grid: {
              color: '#e5e7eb'
            }
          },
          x: {
            grid: {
              color: '#e5e7eb'
            }
          }
        },
        elements: {
          point: {
            radius: 4,
            hoverRadius: 6
          }
        }
      }
    });

    // Função para alternar entre as tabs
    function showTab(tabName) {
      // Esconder todas as tabs
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
      });
      
      // Remover classe active de todos os botões
      document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
      });
      
      // Mostrar a tab selecionada
      document.getElementById(tabName + '-tab').classList.add('active');
      
      // Adicionar classe active ao botão clicado
      event.target.classList.add('active');
    }

    // Função para editar perfil
    function editProfile() {
      alert('Função de edição de perfil - Em desenvolvimento');
    }

    // Função para toggle do menu do usuário
    function toggleUserMenu() {
      alert('Menu do usuário - Em desenvolvimento');
    }

    // Atualização automática dos dados (simulação)
    setInterval(() => {
      // Simular novos dados de sinais vitais
      const newData = {
        fc: Math.floor(Math.random() * 20) + 70, // 70-90 BPM
        temp: (Math.random() * 2 + 36.5).toFixed(1), // 36.5-38.5°C
        paSist: Math.floor(Math.random() * 30) + 110, // 110-140 mmHg
        paDiast: Math.floor(Math.random() * 20) + 70 // 70-90 mmHg
      };
      
      // Aqui você pode atualizar o gráfico com novos dados
      console.log('Novos dados de sinais vitais:', newData);
    }, 30000); // A cada 30 segundos

    // Busca global: enter redireciona para a pesquisa
    (function attachGlobalSearch(){
      const input = document.getElementById('global-search');
      if (!input) return;
      input.addEventListener('keypress', function(e){
        if (e.key === 'Enter') {
          e.preventDefault();
          const term = input.value.trim();
          if (term) window.location.href = `pesquisa-pacientes.html?search=${encodeURIComponent(term)}`;
        }
      });
    })();
  


    // Dados para o gráfico de sinais vitais

    const chartData = {

      labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],

      datasets: [

        {

          label: 'Frequência cardíaca (BPM)',

          data: [75, 78, 80, 77, 82, 85, 83, 80],

          borderColor: '#dc2626',

          backgroundColor: 'rgba(220, 38, 38, 0.1)',

          tension: 0.4

        },

        {

          label: 'Temperatura (°C)',

          data: [37.2, 37.0, 37.5, 37.3, 37.8, 38.0, 37.9, 37.7],

          borderColor: '#2563eb',

          backgroundColor: 'rgba(37, 99, 235, 0.1)',

          tension: 0.4

        },

        {

          label: 'PA Sistólica (mmHg)',

          data: [120, 122, 125, 120, 128, 130, 128, 125],

          borderColor: '#7c3aed',

          backgroundColor: 'rgba(124, 58, 237, 0.1)',

          tension: 0.4

        },

        {

          label: 'PA Diastólica (mmHg)',

          data: [80, 82, 85, 80, 88, 90, 88, 85],

          borderColor: '#ec4899',

          backgroundColor: 'rgba(236, 72, 153, 0.1)',

          tension: 0.4

        }

      ]

    };



    // Configuração do gráfico

    const ctx = document.getElementById('vitalsChart').getContext('2d');

    const vitalsChart = new Chart(ctx, {

      type: 'line',

      data: chartData,

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {

            display: false

          }

        },

        scales: {

          y: {

            beginAtZero: false,

            min: 35,

            max: 140,

            grid: {

              color: '#e5e7eb'

            }

          },

          x: {

            grid: {

              color: '#e5e7eb'

            }

          }

        },

        elements: {

          point: {

            radius: 4,

            hoverRadius: 6

          }

        }

      }

    });



    // Função para alternar entre as tabs

    function showTab(tabName) {

      // Esconder todas as tabs

      document.querySelectorAll('.tab-content').forEach(tab => {

        tab.classList.remove('active');

      });

      

      // Remover classe active de todos os botões

      document.querySelectorAll('.tab-button').forEach(button => {

        button.classList.remove('active');

      });

      

      // Mostrar a tab selecionada

      document.getElementById(tabName + '-tab').classList.add('active');

      

      // Adicionar classe active ao botão clicado

      event.target.classList.add('active');

    }



    // Função para editar perfil

    function editProfile() {

      alert('Função de edição de perfil - Em desenvolvimento');

    }



    // Função para toggle do menu do usuário

    function toggleUserMenu() {

      alert('Menu do usuário - Em desenvolvimento');

    }



    // Atualização automática dos dados (simulação)

    setInterval(() => {

      // Simular novos dados de sinais vitais

      const newData = {

        fc: Math.floor(Math.random() * 20) + 70, // 70-90 BPM

        temp: (Math.random() * 2 + 36.5).toFixed(1), // 36.5-38.5°C

        paSist: Math.floor(Math.random() * 30) + 110, // 110-140 mmHg

        paDiast: Math.floor(Math.random() * 20) + 70 // 70-90 mmHg

      };

      

      // Aqui você pode atualizar o gráfico com novos dados

      console.log('Novos dados de sinais vitais:', newData);

    }, 30000); // A cada 30 segundos

  
