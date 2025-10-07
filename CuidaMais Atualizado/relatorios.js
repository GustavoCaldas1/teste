// ========================================
// RELATÓRIOS - JAVASCRIPT
// ========================================

// ========================================
// VARIÁVEIS GLOBAIS
// ========================================
let alertsOverTimeChart = null;
let urgencyDistributionChart = null;

// ========================================
// FUNÇÕES DE NAVEGAÇÃO
// ========================================
function searchPatient() {
  const searchTerm = document.querySelector('.search-input').value;
  if (searchTerm.trim()) {
    console.log('Pesquisando paciente:', searchTerm);
    // Aqui você implementaria a lógica de pesquisa real
    alert(`Pesquisando por: ${searchTerm}`);
  } else {
    alert('Digite um termo para pesquisar');
  }
}

function toggleUserMenu() {
  const userMenu = document.getElementById('userMenu');
  const userButton = document.querySelector('.app-user');
  
  if (userMenu.classList.contains('show')) {
    userMenu.classList.remove('show');
    userButton.classList.remove('active');
  } else {
    userMenu.classList.add('show');
    userButton.classList.add('active');
  }
}

// Fechar menu ao clicar fora
document.addEventListener('click', function(event) {
  const userMenu = document.getElementById('userMenu');
  const userButton = document.querySelector('.app-user');
  
  if (!userButton.contains(event.target) && !userMenu.contains(event.target)) {
    userMenu.classList.remove('show');
    userButton.classList.remove('active');
  }
});

// Funções do menu de usuário
// Substituído por handlers globais do shared-profile.js

function logout() {
  console.log('Fazendo logout...');
  if (confirm('Deseja realmente sair do sistema?')) {
    alert('Logout realizado com sucesso!');
    // Aqui você pode redirecionar para a página de login
    // window.location.href = 'login.html';
  }
  closeUserMenu();
}

function closeUserMenu() {
  const userMenu = document.getElementById('userMenu');
  const userButton = document.querySelector('.app-user');
  userMenu.classList.remove('show');
  userButton.classList.remove('active');
}

// ========================================
// FUNÇÕES DE ALERTAS
// ========================================
function refreshAlerts() {
  console.log('Atualizando alertas...');
  // Simular atualização
  const alertRows = document.querySelectorAll('.table tbody tr');
  alertRows.forEach(row => {
    row.style.opacity = '0.5';
  });
  
  setTimeout(() => {
    alertRows.forEach(row => {
      row.style.opacity = '1';
    });
    alert('Alertas atualizados!');
  }, 1000);
}

function viewAlert(patientId) {
  console.log('Visualizando alerta do paciente:', patientId);
  alert(`Visualizando alerta do paciente ${patientId}`);
}

function viewHistory(patientId) {
  console.log('Visualizando histórico do paciente:', patientId);
  alert(`Visualizando histórico do paciente ${patientId}`);
}

function resolveAlert(patientId) {
  console.log('Resolvendo alerta do paciente:', patientId);
  if (confirm(`Deseja marcar o alerta do paciente ${patientId} como resolvido?`)) {
    alert('Alerta resolvido com sucesso!');
    // Aqui você atualizaria o status do alerta
  }
}

// ========================================
// FUNÇÕES DE FILTRO
// ========================================
function applyFilters(event) {
  event.preventDefault();
  
  const patientGroup = document.getElementById('patientGroup').value;
  const specificPatient = document.getElementById('specificPatient').value;
  const timeInterval = document.getElementById('timeInterval').value;
  const customDate = document.getElementById('customDate').value;
  
  console.log('Aplicando filtros:', {
    patientGroup,
    specificPatient,
    timeInterval,
    customDate
  });
  
  // Simular aplicação de filtros
  showLoading();
  
  setTimeout(() => {
    hideLoading();
    alert('Filtros aplicados com sucesso!');
    updateCharts();
  }, 1500);
}

function showLoading() {
  const filterBtn = document.querySelector('.btn-filter');
  if (filterBtn) {
    filterBtn.disabled = true;
    filterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Aplicando...';
  }
}

function hideLoading() {
  const filterBtn = document.querySelector('.btn-filter');
  if (filterBtn) {
    filterBtn.disabled = false;
    filterBtn.innerHTML = '<i class="fas fa-filter"></i> Aplicar Filtro';
  }
}

// ========================================
// FUNÇÕES DE EXPORTAÇÃO
// ========================================
function exportToExcel() {
  console.log('Exportando para Excel...');
  
  showExportLoading();
  
  try {
    // Coletar dados da tabela
    const tableData = collectTableData();
    
    // Criar arquivo Excel
    const workbook = createExcelWorkbook(tableData);
    
    // Download do arquivo
    downloadExcelFile(workbook);
    
    hideExportLoading();
    alert('Relatório exportado para Excel com sucesso!');
  } catch (error) {
    hideExportLoading();
    alert('Erro ao exportar relatório: ' + error.message);
  }
}

function collectTableData() {
  const table = document.querySelector('.table');
  const rows = table.querySelectorAll('tbody tr');
  const data = [];
  
  // Cabeçalhos
  const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
  data.push(headers);
  
  // Dados das linhas
  rows.forEach(row => {
    const cells = Array.from(row.querySelectorAll('td'));
    const rowData = cells.map(cell => {
      // Remover badges e pegar apenas o texto
      const badge = cell.querySelector('.badge');
      if (badge) {
        return badge.textContent.trim();
      }
      return cell.textContent.trim();
    });
    data.push(rowData);
  });
  
  return data;
}

function createExcelWorkbook(data) {
  // Criar conteúdo CSV (formato que Excel pode abrir)
  let csvContent = '';
  
  data.forEach(row => {
    const csvRow = row.map(cell => {
      // Escapar aspas e vírgulas
      const escapedCell = cell.replace(/"/g, '""');
      return `"${escapedCell}"`;
    }).join(',');
    csvContent += csvRow + '\n';
  });
  
  return csvContent;
}

function downloadExcelFile(csvContent) {
  // Adicionar BOM para UTF-8
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Criar link de download
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `relatorio_alertas_${formatDateForFilename(new Date())}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

function formatDateForFilename(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}${month}${day}_${hours}${minutes}`;
}

function showExportLoading() {
  const exportBtn = document.querySelector('.btn-export');
  if (exportBtn) {
    exportBtn.disabled = true;
    exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exportando...';
  }
}

function hideExportLoading() {
  const exportBtn = document.querySelector('.btn-export');
  if (exportBtn) {
    exportBtn.disabled = false;
    exportBtn.innerHTML = '<i class="fas fa-file-excel"></i> Exportar para Excel';
  }
}

// ========================================
// GRÁFICOS
// ========================================
function initCharts() {
  initAlertsOverTimeChart();
  initUrgencyDistributionChart();
}

function initAlertsOverTimeChart() {
  const ctx = document.getElementById('alertsOverTimeChart');
  if (!ctx) return;
  
  alertsOverTimeChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jul 22', 'Jul 23', 'Jul 24', 'Jul 25', 'Jul 26', 'Jul 27', 'Jul 28'],
      datasets: [
        {
          label: 'Alertas',
          data: [8, 15, 10, 18, 20, 24, 28],
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
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
          beginAtZero: true,
          max: 32,
          grid: {
            color: '#f1f5f9'
          },
          ticks: {
            stepSize: 8
          }
        },
        x: {
          grid: {
            color: '#f1f5f9'
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
}

function initUrgencyDistributionChart() {
  const ctx = document.getElementById('urgencyDistributionChart');
  if (!ctx) return;
  
  urgencyDistributionChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Crítico', 'Alto', 'Médio', 'Baixo'],
      datasets: [
        {
          label: 'Quantidade',
          data: [25, 40, 58, 35],
          backgroundColor: [
            '#dc2626',
            '#f59e0b',
            '#8b5cf6',
            '#6b7280'
          ],
          borderColor: [
            '#dc2626',
            '#f59e0b',
            '#8b5cf6',
            '#6b7280'
          ],
          borderWidth: 1
        }
      ]
    },
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
          beginAtZero: true,
          max: 60,
          grid: {
            color: '#f1f5f9'
          },
          ticks: {
            stepSize: 15
          }
        },
        x: {
          grid: {
            color: '#f1f5f9'
          }
        }
      }
    }
  });
}

function updateCharts() {
  // Atualizar dados dos gráficos baseado nos filtros
  console.log('Atualizando gráficos...');
  
  if (alertsOverTimeChart) {
    // Simular novos dados
    const newData = Array.from({length: 7}, () => Math.floor(Math.random() * 30) + 10);
    alertsOverTimeChart.data.datasets[0].data = newData;
    alertsOverTimeChart.update();
  }
  
  if (urgencyDistributionChart) {
    // Simular novos dados
    const newData = [
      Math.floor(Math.random() * 30) + 20,
      Math.floor(Math.random() * 40) + 30,
      Math.floor(Math.random() * 50) + 40,
      Math.floor(Math.random() * 10) + 5
    ];
    urgencyDistributionChart.data.datasets[0].data = newData;
    urgencyDistributionChart.update();
  }
}

// ========================================
// FUNÇÕES DE FILTRO DINÂMICO
// ========================================
function toggleCustomDate() {
  const timeInterval = document.getElementById('timeInterval');
  const customDateGroup = document.getElementById('customDateGroup');
  
  if (timeInterval.value === 'custom') {
    customDateGroup.style.display = 'block';
  } else {
    customDateGroup.style.display = 'none';
  }
}

// ========================================
// FUNÇÕES DE ESTATÍSTICAS
// ========================================
function updateStatistics() {
  // Simular atualização de estatísticas
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => {
    const currentValue = parseInt(stat.textContent.replace(/[^\d]/g, ''));
    const newValue = currentValue + Math.floor(Math.random() * 10) - 5;
    
    if (stat.textContent.includes('h')) {
      stat.textContent = `${newValue}h ${Math.floor(Math.random() * 60)}m`;
    } else {
      stat.textContent = newValue.toLocaleString();
    }
  });
}

// ========================================
// EVENT LISTENERS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar gráficos
  initCharts();
  
  // Configurar filtro de data customizada
  const timeInterval = document.getElementById('timeInterval');
  if (timeInterval) {
    timeInterval.addEventListener('change', toggleCustomDate);
  }
  
  // Pesquisa ao pressionar Enter
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchPatient();
      }
    });
  }
  
  // Efeitos de hover nos cards de estatísticas
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Efeitos de hover na tabela
  const tableRows = document.querySelectorAll('.table tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
      this.style.backgroundColor = '#f8fafc';
    });
    
    row.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '';
    });
  });
  
  // Atualizar estatísticas a cada 30 segundos
  setInterval(updateStatistics, 30000);
});

// ========================================
// FUNÇÕES DE UTILIDADE
// ========================================
function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR');
}

function formatTime(time) {
  return new Date(time).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

// ========================================
// SIMULAÇÃO DE DADOS EM TEMPO REAL
// ========================================
function simulateRealTimeData() {
  setInterval(() => {
    console.log('Simulando dados em tempo real...');
    updateStatistics();
    updateCharts();
  }, 60000); // A cada minuto
}

// Iniciar simulação de dados em tempo real
document.addEventListener('DOMContentLoaded', function() {
  simulateRealTimeData();
});

// ========================================
// REGISTRO GLOBAL DAS FUNÇÕES
// ========================================
window.searchAlerts = searchAlerts;
window.toggleUserMenu = toggleUserMenu;
window.refreshAlerts = refreshAlerts;
window.exportToExcel = exportToExcel;
window.initAlertsOverTimeChart = initAlertsOverTimeChart;
window.initUrgencyDistributionChart = initUrgencyDistributionChart;
window.viewProfile = viewProfile;
window.editProfile = editProfile;
window.changePassword = changePassword;
window.settings = settings;
window.logout = logout;
window.closeUserMenu = closeUserMenu;

console.log('Todas as funções foram registradas globalmente');
