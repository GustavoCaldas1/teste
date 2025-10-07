// ========================================
// PESQUISA DE PACIENTES - JAVASCRIPT
// ========================================

// ========================================
// FUNÇÕES DE PESQUISA
// ========================================
function handleSearch(event) {
  event.preventDefault();
  
  const name = document.getElementById('search-name').value;
  const id = document.getElementById('search-id').value;
  const status = document.getElementById('search-status').value;
  
  console.log('Pesquisando:', { name, id, status });
  
  // Simular resultado de pesquisa
  showSearchResults({ name, id, status });
}

function showSearchResults(params) {
  // Aqui você implementaria a lógica de pesquisa real
  // Por enquanto, apenas mostra um alerta
  const searchTerm = params.name || params.id || 'todos os pacientes';
  alert(`Pesquisa realizada para: ${searchTerm}`);
}

// ========================================
// FUNÇÕES DE AÇÃO
// ========================================
function viewPatient(patientName) {
  console.log('Visualizando paciente:', patientName);
  window.location.href = 'perfil-paciente.html';
}

function editPatient(patientName) {
  console.log('Editando paciente:', patientName);
  const url = `perfil-paciente.html?edit=1&name=${encodeURIComponent(patientName)}`;
  window.location.href = url;
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
// FUNÇÕES DE PAGINAÇÃO
// ========================================
function goToPage(pageNumber) {
  console.log('Indo para página:', pageNumber);
  // Aqui você implementaria a lógica de paginação real
  updatePaginationButtons(pageNumber);
}

function updatePaginationButtons(currentPage) {
  const buttons = document.querySelectorAll('.pagination-controls .btn');
  buttons.forEach((btn, index) => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-secondary');
    
    if (index === currentPage) {
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');
    }
  });
}

// ========================================
// FUNÇÕES DE FILTRO
// ========================================
function filterByStatus(status) {
  console.log('Filtrando por status:', status);
  // Aqui você implementaria a lógica de filtro real
  const rows = document.querySelectorAll('.table tbody tr');
  rows.forEach(row => {
    const statusBadge = row.querySelector('.badge');
    if (status === '' || statusBadge.textContent.toLowerCase().includes(status.toLowerCase())) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// ========================================
// EVENT LISTENERS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Filtro por status
  const statusSelect = document.getElementById('search-status');
  if (statusSelect) {
    statusSelect.addEventListener('change', function() {
      filterByStatus(this.value);
    });
  }
  
  // Paginação
  const paginationButtons = document.querySelectorAll('.pagination-controls .btn');
  paginationButtons.forEach((btn, index) => {
    btn.addEventListener('click', function() {
      if (!this.disabled) {
        goToPage(index);
      }
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
  
  // Efeitos de hover nos botões
  const actionButtons = document.querySelectorAll('.table .btn');
  actionButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-1px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// ========================================
// FUNÇÕES DE UTILIDADE
// ========================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ========================================
// REGISTRO GLOBAL DAS FUNÇÕES
// ========================================
window.searchPatients = searchPatients;
window.clearSearch = clearSearch;
window.viewPatient = viewPatient;
window.editPatient = editPatient;
window.toggleUserMenu = toggleUserMenu;
window.goToPage = goToPage;
window.updatePagination = updatePagination;
window.viewProfile = viewProfile;
window.editProfile = editProfile;
window.changePassword = changePassword;
window.settings = settings;
window.logout = logout;
window.closeUserMenu = closeUserMenu;

console.log('Todas as funções foram registradas globalmente');

// Pesquisa em tempo real (debounced)
const searchInput = document.getElementById('search-name');
if (searchInput) {
  const debouncedSearch = debounce(function() {
    const searchTerm = this.value;
    if (searchTerm.length > 2) {
      console.log('Pesquisa em tempo real:', searchTerm);
      // Aqui você implementaria a pesquisa em tempo real
    }
  }, 300);
  
  searchInput.addEventListener('input', debouncedSearch);
}

