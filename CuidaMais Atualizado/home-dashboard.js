// ========================================
// HOME DASHBOARD - JAVASCRIPT
// ========================================

// ========================================
// FUNÇÕES DE NAVEGAÇÃO
// ========================================
function searchPatients() {
  const searchTerm = document.querySelector('.search-container input').value;
  if (searchTerm.trim()) {
    window.location.href = `pesquisa-pacientes.html?search=${encodeURIComponent(searchTerm)}`;
  } else {
    alert('Digite um termo para pesquisar');
  }
}

function viewPatient(patientName) {
  window.location.href = 'perfil-paciente.html';
}

function openDataRegistration() {
  window.location.href = 'registrar-dados.html';
}

function openPatientMonitoring() {
  window.location.href = 'pesquisa-pacientes.html';
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
  openProfileModal('view');
}

function editProfile() {
  openProfileModal('edit');
}

function changePassword() {
  openProfileModal('password');
}

function settings() {
  openProfileModal('settings');
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
// EVENT LISTENERS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Pesquisa ao pressionar Enter
  const searchInput = document.querySelector('.search-container input');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchPatients();
      }
    });
  }

  // Efeitos de hover nos cards de ação
  const actionBtns = document.querySelectorAll('.action-btn');
  actionBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Efeitos de hover nos alertas
  const alertItems = document.querySelectorAll('.alert-item');
  alertItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'translateX(4px)';
        icon.style.color = '#8b5cf6';
      }
    });

    item.addEventListener('mouseleave', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'translateX(0)';
        icon.style.color = '#94a3b8';
      }
    });
  });
});

// ========================================
// ANIMAÇÕES E EFEITOS
// ========================================
function animateCards() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.3s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// ========================================
// SIMULAÇÃO DE DADOS EM TEMPO REAL
// ========================================
function updateAlertTimes() {
  const timeElements = document.querySelectorAll('.alert-time, .activity-time');
  timeElements.forEach(element => {
    const text = element.textContent;
    if (text.includes('min atrás') || text.includes('hr atrás')) {
      // Aqui você pode implementar uma lógica mais sofisticada
      // para atualizar os tempos em tempo real
    }
  });
}

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Aplicar classe de loading para transições suaves
  const mainContent = document.querySelector('.app-main');
  if (mainContent) {
    mainContent.classList.add('loaded');
  }
  
  // Animar cards na entrada
  setTimeout(animateCards, 100);
  
  // Atualizar tempos a cada minuto
  setInterval(updateAlertTimes, 60000);
  
  // Simular novos alertas (opcional)
  setInterval(() => {
    const alertItems = document.querySelectorAll('.alert-item');
    if (alertItems.length > 0) {
      const randomAlert = alertItems[Math.floor(Math.random() * alertItems.length)];
      randomAlert.style.backgroundColor = '#fef3c7';
      setTimeout(() => {
        randomAlert.style.backgroundColor = '';
      }, 2000);
    }
  }, 10000);
});

// Aplicar/Salvar tema escuro imediatamente ao alternar o toggle das configurações
document.addEventListener('change', function(e) {
  if (e.target && e.target.id === 'settingDark') {
    const enableDark = e.target.checked;
    // aplica na página atual
    const html = document.documentElement;
    if (enableDark) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
    // persiste junto com a configuração atual de notificações
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.settings);
      const current = saved ? JSON.parse(saved) : { notifications: true };
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify({
        dark: enableDark,
        notifications: typeof current.notifications === 'boolean' ? current.notifications : true
      }));
    } catch (_) {}
  }
});

// PERFIL, FOTO E CONFIGURAÇÕES (localStorage)
const STORAGE_KEYS = {
  photo: 'cm_user_photo',
  profile: 'cm_user_profile',
  settings: 'cm_user_settings'
};

function getProfile() {
  const saved = localStorage.getItem(STORAGE_KEYS.profile);
  return saved ? JSON.parse(saved) : {
    name: 'Dr. João Silva',
    role: 'Médico',
    crm: '123456',
    status: 'Online'
  };
}

function setProfile(profile) {
  localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
  updateProfileUIFromData(profile);
}

function getSettings() {
  const saved = localStorage.getItem(STORAGE_KEYS.settings);
  return saved ? JSON.parse(saved) : { dark: false, notifications: true };
}

function setSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

function getPhoto() {
  return localStorage.getItem(STORAGE_KEYS.photo) || '';
}

function setPhoto(dataUrl) {
  localStorage.setItem(STORAGE_KEYS.photo, dataUrl);
  updateAvatarImages(dataUrl);
}

function removeProfilePhoto() {
  localStorage.removeItem(STORAGE_KEYS.photo);
  updateAvatarImages('');
  const img = document.getElementById('profilePhotoPreview');
  if (img) {
    img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112"><rect width="100%" height="100%" fill="%23f1f5f9"/></svg>';
  }
}

function updateAvatarImages(dataUrl) {
  const headerAvatar = document.querySelector('.user-avatar');
  const menuAvatar = document.querySelector('.user-avatar-large');
  if (dataUrl) {
    headerAvatar.style.backgroundImage = `url(${dataUrl})`;
    headerAvatar.style.backgroundSize = 'cover';
    headerAvatar.innerHTML = '';
    menuAvatar.style.backgroundImage = `url(${dataUrl})`;
    menuAvatar.style.backgroundSize = 'cover';
    menuAvatar.innerHTML = '';
  } else {
    headerAvatar.style.backgroundImage = '';
    menuAvatar.style.backgroundImage = '';
    if (!headerAvatar.innerHTML) headerAvatar.innerHTML = '<i class="fas fa-user"></i>';
    if (!menuAvatar.innerHTML) menuAvatar.innerHTML = '<i class="fas fa-user"></i>';
  }
}

function updateProfileUIFromData(profile) {
  // Header
  const nameEl = document.querySelector('.user-name');
  const roleEl = document.querySelector('.user-role');
  if (nameEl) nameEl.textContent = profile.name;
  if (roleEl) roleEl.textContent = profile.role;
  // Menu header
  const menuHeaderName = document.querySelector('.user-details h3');
  const menuHeaderRole = document.querySelector('.user-details p');
  const menuStatus = document.querySelector('.user-status');
  if (menuHeaderName) menuHeaderName.textContent = profile.name;
  if (menuHeaderRole) menuHeaderRole.textContent = `${profile.role} - CRM ${profile.crm}`;
  if (menuStatus) menuStatus.textContent = profile.status;
}

// Initialize avatars and profile text at startup
document.addEventListener('DOMContentLoaded', () => {
  updateAvatarImages(getPhoto());
  updateProfileUIFromData(getProfile());
  // Se página recebeu query para abrir aba do perfil
  const params = new URLSearchParams(window.location.search);
  const openTab = params.get('profile');
  if (openTab) {
    setTimeout(() => openProfileModal(openTab), 100);
  }
});

// -------- Modal controls
function openProfileModal(tab) {
  const overlay = document.getElementById('profileModal');
  if (!overlay) return;
  overlay.classList.add('show');
  switchProfileTab(tab || 'view');
  const profile = getProfile();
  // Fill forms
  const editName = document.getElementById('editName');
  const editRole = document.getElementById('editRole');
  const editCrm = document.getElementById('editCrm');
  const editStatus = document.getElementById('editStatus');
  if (editName) editName.value = profile.name;
  if (editRole) editRole.value = profile.role;
  if (editCrm) editCrm.value = profile.crm;
  if (editStatus) editStatus.value = profile.status;
  // Fill view
  const viewName = document.getElementById('viewName');
  const viewRole = document.getElementById('viewRole');
  const viewCrm = document.getElementById('viewCrm');
  const viewStatus = document.getElementById('viewStatus');
  if (viewName) viewName.textContent = profile.name;
  if (viewRole) viewRole.textContent = profile.role;
  if (viewCrm) viewCrm.textContent = profile.crm;
  if (viewStatus) viewStatus.textContent = profile.status;
  // Photo
  const img = document.getElementById('profilePhotoPreview');
  if (img) img.src = getPhoto() || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112"><rect width="100%" height="100%" fill="%23f1f5f9"/></svg>';
  // Settings
  const s = getSettings();
  const dark = document.getElementById('settingDark');
  const notif = document.getElementById('settingNotifications');
  if (dark) dark.checked = !!s.dark;
  if (notif) notif.checked = !!s.notifications;
  // Close dropdown
  closeUserMenu();
}

function closeProfileModal() {
  const overlay = document.getElementById('profileModal');
  if (overlay) overlay.classList.remove('show');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const overlay = document.getElementById('profileModal');
  if (!overlay || !overlay.classList.contains('show')) return;
  const modal = overlay.querySelector('.modal');
  if (overlay === e.target) closeProfileModal();
});

function switchProfileTab(tab) {
  const title = document.getElementById('modalTitle');
  const buttons = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');
  buttons.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === tab));
  contents.forEach(c => c.classList.toggle('hidden', c.id !== `tab-${tab}`));
  if (title) {
    const map = { view: 'Meu Perfil', edit: 'Editar Perfil', password: 'Alterar Senha', settings: 'Configurações' };
    title.textContent = map[tab] || 'Meu Perfil';
  }
}

function saveProfile(evt) {
  evt.preventDefault();
  const profile = {
    name: document.getElementById('editName').value.trim(),
    role: document.getElementById('editRole').value.trim(),
    crm: document.getElementById('editCrm').value.trim(),
    status: document.getElementById('editStatus').value
  };
  setProfile(profile);
  openProfileModal('view');
}

function resetEditForm() {
  openProfileModal('view');
}

function savePassword(evt) {
  evt.preventDefault();
  const newPass = document.getElementById('newPassword').value;
  const confirmPass = document.getElementById('confirmPassword').value;
  if (newPass !== confirmPass) {
    alert('As senhas não coincidem.');
    return;
  }
  // Simulação: armazenar hash fictício apenas para UX demo
  localStorage.setItem('cm_user_pwd_set', '1');
  alert('Senha atualizada com sucesso.');
  switchProfileTab('view');
}

function saveSettings(evt) {
  evt.preventDefault();
  const dark = document.getElementById('settingDark').checked;
  const notifications = document.getElementById('settingNotifications').checked;
  setSettings({ dark, notifications });
  // aplicar imediatamente o tema na página atual
  const html = document.documentElement;
  if (dark) {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.removeAttribute('data-theme');
  }
  alert('Configurações salvas.');
  switchProfileTab('view');
}

// Photo upload
document.addEventListener('change', (e) => {
  if (e.target && e.target.id === 'profilePhotoInput') {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setPhoto(dataUrl);
      const img = document.getElementById('profilePhotoPreview');
      if (img) img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }
});

