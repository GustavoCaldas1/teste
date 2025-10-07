// ========================================
// PERFIL DO PACIENTE - JAVASCRIPT
// ========================================

// ========================================
// FUNÇÕES DE NAVEGAÇÃO
// ========================================
function editProfile() {
  openPatientModal();
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
function viewProfile() {
  console.log('Visualizando perfil do usuário...');
  alert('Visualizando perfil do usuário - Em desenvolvimento');
  closeUserMenu();
}

// Removido: função duplicada de editar perfil do usuário

function changePassword() {
  console.log('Alterando senha...');
  alert('Alterando senha - Em desenvolvimento');
  closeUserMenu();
}

function settings() {
  console.log('Abrindo configurações...');
  alert('Configurações - Em desenvolvimento');
  closeUserMenu();
}

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
// FUNÇÕES DE TABS
// ========================================
function showTab(tabName) {
  // Esconder todas as tabs
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabPanes.forEach(pane => {
    pane.classList.remove('active');
  });
  
  // Remover active de todos os botões
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Mostrar tab selecionada
  const selectedTab = document.getElementById(tabName + '-tab');
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Ativar botão selecionado
  const selectedButton = document.querySelector(`[onclick="showTab('${tabName}')"]`);
  if (selectedButton) {
    selectedButton.classList.add('active');
  }
  
  console.log('Mostrando tab:', tabName);
}

// ========================================
// GRÁFICO DE SINAIS VITAIS
// ========================================
function initVitalsChart() {
  const ctx = document.getElementById('vitalsChart');
  if (!ctx) return;
  
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      datasets: [
        {
          label: 'Frequência Cardíaca',
          data: [75, 78, 82, 85, 80, 77, 75],
          borderColor: '#dc2626',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          tension: 0.4
        },
        {
          label: 'Temperatura',
          data: [36.5, 36.8, 37.2, 37.5, 37.3, 37.0, 36.8],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          tension: 0.4
        },
        {
          label: 'PA Sistólica',
          data: [120, 125, 130, 135, 128, 125, 122],
          borderColor: '#7c3aed',
          backgroundColor: 'rgba(124, 58, 237, 0.1)',
          tension: 0.4
        },
        {
          label: 'PA Diastólica',
          data: [80, 82, 85, 88, 85, 82, 80],
          borderColor: '#ec4899',
          backgroundColor: 'rgba(236, 72, 153, 0.1)',
          tension: 0.4
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
          beginAtZero: false,
          grid: {
            color: '#f1f5f9'
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

// ========================================
// FUNÇÕES DE DADOS
// ========================================
function loadPatientData() {
  // Simular carregamento de dados do paciente
  console.log('Carregando dados do paciente...');
  
  // Aqui você faria uma requisição AJAX para buscar os dados
  // Por enquanto, apenas simular
  setTimeout(() => {
    console.log('Dados do paciente carregados');
  }, 1000);
}

function updateVitalsChart() {
  // Simular atualização dos sinais vitais
  console.log('Atualizando gráfico de sinais vitais...');
  
  // Aqui você atualizaria os dados do gráfico
  // Por enquanto, apenas simular
}

// ========================================
// FUNÇÕES DE COMENTÁRIOS
// ========================================
function addComment() {
  const commentText = prompt('Digite seu comentário:');
  if (commentText && commentText.trim()) {
    console.log('Adicionando comentário:', commentText);
    // Aqui você adicionaria o comentário ao banco de dados
    alert('Comentário adicionado com sucesso!');
  }
}

// ========================================
// EVENT LISTENERS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar gráfico
  initVitalsChart();
  
  // Carregar dados do paciente
  loadPatientData();
  
  // Efeitos de hover nos detalhes do paciente
  const detailItems = document.querySelectorAll('.detail-item');
  detailItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.backgroundColor = '#f8fafc';
      this.style.borderRadius = '4px';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '';
      this.style.borderRadius = '';
    });
  });
  
  // Efeitos de hover nos comentários
  const commentItems = document.querySelectorAll('.comment-item');
  commentItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
  
  // Atualizar gráfico a cada 5 minutos
  setInterval(updateVitalsChart, 300000);
});

// ========================================
// MODAL DE EDIÇÃO DO PACIENTE
// ========================================
function openPatientModal() {
  const overlay = document.getElementById('patientEditModal');
  if (!overlay) return;
  // Preencher com dados atuais da UI
  const name = document.querySelector('.patient-name')?.textContent.trim() || '';
  const age = document.querySelectorAll('.detail-value')[0]?.textContent.replace(/\D/g, '') || '';
  const room = document.querySelectorAll('.detail-value')[1]?.textContent.trim() || '';
  const blood = document.querySelectorAll('.detail-value')[2]?.textContent.trim() || '';
  const admission = document.querySelectorAll('.detail-value')[3]?.textContent.trim() || '';
  const contact = document.querySelectorAll('.detail-value')[4]?.textContent.trim() || '';

  document.getElementById('patientName').value = name;
  document.getElementById('patientAge').value = age;
  document.getElementById('patientRoom').value = room;
  document.getElementById('patientBlood').value = blood;
  document.getElementById('patientAdmission').value = admission;
  document.getElementById('patientContact').value = contact;

  const photo = localStorage.getItem('cm_patient_photo');
  const img = document.getElementById('patientPhotoPreview');
  if (img) img.src = photo || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112"><rect width="100%" height="100%" fill="%23f1f5f9"/></svg>';

  overlay.classList.add('show');
}

function closePatientModal() {
  const overlay = document.getElementById('patientEditModal');
  if (overlay) overlay.classList.remove('show');
}

function savePatientEdits(evt) {
  evt.preventDefault();
  const name = document.getElementById('patientName').value.trim();
  const age = document.getElementById('patientAge').value.trim();
  const room = document.getElementById('patientRoom').value.trim();
  const blood = document.getElementById('patientBlood').value;
  const admission = document.getElementById('patientAdmission').value;
  const contact = document.getElementById('patientContact').value.trim();

  // Atualizar UI
  const nameEl = document.querySelector('.patient-name');
  const values = document.querySelectorAll('.detail-value');
  if (nameEl) nameEl.textContent = name;
  if (values[0]) values[0].textContent = `${age} anos`;
  if (values[1]) values[1].textContent = room;
  if (values[2]) values[2].textContent = blood;
  if (values[3]) values[3].textContent = admission;
  if (values[4]) values[4].textContent = contact;

  // Persistência simples (demo) no localStorage
  const data = { name, age, room, blood, admission, contact };
  localStorage.setItem('cm_patient_profile', JSON.stringify(data));

  closePatientModal();
  alert('Perfil do paciente atualizado.');
}

// Foto do paciente
document.addEventListener('change', (e) => {
  if (e.target && e.target.id === 'patientPhotoInput') {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      localStorage.setItem('cm_patient_photo', dataUrl);
      const img = document.getElementById('patientPhotoPreview');
      if (img) img.src = dataUrl;
      // Atualiza avatar com iniciais? Aqui podemos futuramente trocar a bolinha por foto.
    };
    reader.readAsDataURL(file);
  }
});

// Carregar dados persistidos ao abrir página
document.addEventListener('DOMContentLoaded', () => {
  // Se veio de edição pela lista, abrir modal e preencher nome
  const params = new URLSearchParams(window.location.search);
  if (params.get('edit') === '1') {
    const nameFromList = params.get('name');
    if (nameFromList) {
      const nameEl = document.querySelector('.patient-name');
      if (nameEl) nameEl.textContent = decodeURIComponent(nameFromList);
    }
    // Abrir modal de edição automaticamente
    setTimeout(openPatientModal, 100);
  }

  const saved = localStorage.getItem('cm_patient_profile');
  if (saved) {
    try {
      const { name, age, room, blood, admission, contact } = JSON.parse(saved);
      const nameEl = document.querySelector('.patient-name');
      const values = document.querySelectorAll('.detail-value');
      if (nameEl && name) nameEl.textContent = name;
      if (values[0] && age) values[0].textContent = `${age} anos`;
      if (values[1] && room) values[1].textContent = room;
      if (values[2] && blood) values[2].textContent = blood;
      if (values[3] && admission) values[3].textContent = admission;
      if (values[4] && contact) values[4].textContent = contact;
    } catch(_) {}
  }
});

// Expor funções
window.openPatientModal = openPatientModal;
window.closePatientModal = closePatientModal;
window.savePatientEdits = savePatientEdits;

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
  // Simular atualização de dados em tempo real
  setInterval(() => {
    console.log('Simulando atualização de dados em tempo real...');
    // Aqui você atualizaria os dados do paciente
  }, 30000); // A cada 30 segundos
}

// Iniciar simulação de dados em tempo real
document.addEventListener('DOMContentLoaded', function() {
  simulateRealTimeData();
});

// ========================================
// REGISTRO GLOBAL DAS FUNÇÕES
// ========================================
window.editProfile = editProfile;
window.toggleUserMenu = toggleUserMenu;
window.showTab = showTab;
window.addMedication = addMedication;
window.removeMedication = removeMedication;
window.addAllergy = addAllergy;
window.removeAllergy = removeAllergy;
window.addVitalSign = addVitalSign;
window.removeVitalSign = removeVitalSign;
window.addNote = addNote;
window.removeNote = removeNote;
window.savePatientData = savePatientData;
window.viewProfile = viewProfile;
window.changePassword = changePassword;
window.settings = settings;
window.logout = logout;
window.closeUserMenu = closeUserMenu;

console.log('Todas as funções foram registradas globalmente');

