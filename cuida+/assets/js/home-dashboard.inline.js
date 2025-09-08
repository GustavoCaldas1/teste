
    // Função para pesquisa de pacientes
    function searchPatients() {
      const searchTerm = document.querySelector('.search-input').value;
      if (searchTerm.trim()) {
        // Redirecionar para a página de pesquisa com o termo
        window.location.href = `pesquisa-pacientes.html?search=${encodeURIComponent(searchTerm)}`;
      } else {
        alert('Digite um termo para pesquisar');
      }
    }

    // Enter também dispara a pesquisa
    document.querySelector('.search-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchPatients();
      }
    });

    // Função para visualizar paciente
    function viewPatient(patientName) {
      // Redirecionar para o perfil do paciente
      window.location.href = 'perfil-paciente.html';
    }

    // Função para abrir registro de dados
    function openDataRegistration() {
      window.location.href = 'registrar-dados.html';
    }

    // Função para abrir monitoramento de pacientes
    function openPatientMonitoring() {
      alert('Abrindo monitoramento de pacientes...');
      // Aqui você pode redirecionar para a página de monitoramento
    }

    // Função para abrir configurações
    function openSettings() {
      alert('Abrindo configurações do sistema...');
      // Aqui você pode redirecionar para a página de configurações
    }

    // Função para toggle do menu do usuário
    function toggleUserMenu() {
      alert('Menu do usuário - Em desenvolvimento');
      // Aqui você pode implementar um dropdown menu
    }

    // (mantido acima)

    // Efeitos de hover nos cards de ação
    document.querySelectorAll('.action-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });

    // Atualização automática de alertas (simulação)
    setInterval(() => {
      // Simular novos alertas
      const alertItems = document.querySelectorAll('.alert-item');
      if (alertItems.length > 0) {
        const randomAlert = alertItems[Math.floor(Math.random() * alertItems.length)];
        randomAlert.style.backgroundColor = '#fef3c7';
        setTimeout(() => {
          randomAlert.style.backgroundColor = '';
        }, 2000);
      }
    }, 10000);

    // Contador de tempo real
    function updateTimeAgo() {
      const timeElements = document.querySelectorAll('.alert-time, .activity-time');
      timeElements.forEach(element => {
        const text = element.textContent;
        if (text.includes('min atrás') || text.includes('hr atrás')) {
          // Aqui você pode implementar uma lógica mais sofisticada
          // para atualizar os tempos em tempo real
        }
      });
    }

    // Atualizar tempos a cada minuto
    setInterval(updateTimeAgo, 60000);

    // Animações de entrada
    document.addEventListener('DOMContentLoaded', function() {
      // Adicionar classes de animação após o carregamento
      const elements = document.querySelectorAll('.fade-in-up, .fade-in-up-delay-1, .fade-in-up-delay-2, .fade-in-up-delay-3');
      elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
      });

      setTimeout(() => {
        elements.forEach(element => {
          element.style.transition = 'all 0.6s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        });
      }, 100);
    });
  
