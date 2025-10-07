// ========================================
// SHARED PROFILE SYNC (Médico e Paciente)
// Lê do localStorage e aplica em qualquer página
// ========================================

(function() {
  const STORAGE = {
    userPhoto: 'cm_user_photo',
    userProfile: 'cm_user_profile',
    patientProfile: 'cm_patient_profile',
    patientPhoto: 'cm_patient_photo',
    userSettings: 'cm_user_settings',
    darkMode: 'cm_dark_mode'
  };

  function updateDoctorUI() {
    try {
      const profileStr = localStorage.getItem(STORAGE.userProfile);
      if (profileStr) {
        const profile = JSON.parse(profileStr);
        const nameEl = document.querySelector('.user-name');
        const roleEl = document.querySelector('.user-role');
        const menuHeaderName = document.querySelector('.user-details h3');
        const menuHeaderRole = document.querySelector('.user-details p');
        const menuStatus = document.querySelector('.user-status');
        if (nameEl && profile.name) nameEl.textContent = profile.name;
        if (roleEl && profile.role) roleEl.textContent = profile.role;
        if (menuHeaderName && profile.name) menuHeaderName.textContent = profile.name;
        if (menuHeaderRole && (profile.role || profile.crm)) {
          menuHeaderRole.textContent = `${profile.role || ''}${profile.crm ? ' - CRM ' + profile.crm : ''}`.trim();
        }
        if (menuStatus && profile.status) menuStatus.textContent = profile.status;
      }

      const photo = localStorage.getItem(STORAGE.userPhoto);
      const headerAvatar = document.querySelector('.user-avatar');
      const menuAvatar = document.querySelector('.user-avatar-large');
      if (photo) {
        if (headerAvatar) { headerAvatar.style.backgroundImage = `url(${photo})`; headerAvatar.style.backgroundSize = 'cover'; headerAvatar.innerHTML = ''; }
        if (menuAvatar)  { menuAvatar .style.backgroundImage = `url(${photo})`; menuAvatar .style.backgroundSize = 'cover'; menuAvatar .innerHTML = ''; }
      } else {
        if (headerAvatar) { headerAvatar.style.backgroundImage = ''; if (!headerAvatar.innerHTML) headerAvatar.innerHTML = '<i class="fas fa-user"></i>'; }
        if (menuAvatar)  { menuAvatar .style.backgroundImage = ''; if (!menuAvatar .innerHTML) menuAvatar .innerHTML = '<i class="fas fa-user"></i>'; }
      }
    } catch (_) {}
  }

  function updatePatientUI() {
    try {
      const saved = localStorage.getItem(STORAGE.patientProfile);
      if (saved) {
        const { name, age, room, blood, admission, contact } = JSON.parse(saved);
        const nameEl = document.querySelector('.patient-name');
        const values = document.querySelectorAll('.detail-value');
        if (nameEl && name) nameEl.textContent = name;
        if (values[0] && age) values[0].textContent = `${age} anos`;
        if (values[1] && room) values[1].textContent = room;
        if (values[2] && blood) values[2].textContent = blood;
        if (values[3] && admission) values[3].textContent = admission;
        if (values[4] && contact) values[4].textContent = contact;
      }

      const photo = localStorage.getItem(STORAGE.patientPhoto);
      const avatar = document.querySelector('.patient-avatar');
      if (avatar) {
        if (photo) {
          avatar.style.backgroundImage = `url(${photo})`;
          avatar.style.backgroundSize = 'cover';
          avatar.style.backgroundPosition = 'center';
          // Remove iniciais se houver
          if (avatar.firstElementChild) avatar.firstElementChild.remove();
        } else {
          avatar.style.backgroundImage = '';
        }
      }
    } catch (_) {}
  }

  document.addEventListener('DOMContentLoaded', function() {
    // aplicar tema salvo (dark/light) em todas as páginas
    try {
      const saved = localStorage.getItem(STORAGE.userSettings);
      const settings = saved ? JSON.parse(saved) : { dark: false };
      const html = document.documentElement;
      if (settings && settings.dark) {
        html.setAttribute('data-theme', 'dark');
      } else {
        html.removeAttribute('data-theme');
      }
    } catch (_) {}
    updateDoctorUI();
    updatePatientUI();
  });

  // reagir a alterações do storage (outra aba/página salvou configurações)
  window.addEventListener('storage', function(e) {
    if (e.key === STORAGE.userSettings) {
      try {
        const settings = e.newValue ? JSON.parse(e.newValue) : { dark: false };
        const html = document.documentElement;
        if (settings && settings.dark) {
          html.setAttribute('data-theme', 'dark');
        } else {
          html.removeAttribute('data-theme');
        }
      } catch (_) {}
    }
  });

  // ========================================
  // AÇÕES DO MENU DO PERFIL (GENÉRICAS)
  // Em qualquer página: redireciona para o dashboard e abre a aba correta
  // ========================================
  function goToDashboardProfile(tab) {
    const url = `home-dashboard.html?profile=${encodeURIComponent(tab)}`;
    window.location.href = url;
  }

  function viewProfile() { goToDashboardProfile('view'); }
  function editProfile() { goToDashboardProfile('edit'); }
  function changePassword() { goToDashboardProfile('password'); }
  function settings() { goToDashboardProfile('settings'); }
  function logout() {
    if (confirm('Deseja realmente sair do sistema?')) {
      // Simplesmente vai para a tela de login se existir
      if (window.location.pathname.indexOf('login.html') === -1) {
        window.location.href = 'login.html';
      }
    }
  }
  function closeUserMenu() {
    const userMenu = document.getElementById('userMenu');
    const userButton = document.querySelector('.app-user');
    if (userMenu) userMenu.classList.remove('show');
    if (userButton) userButton.classList.remove('active');
  }

  // ========================================
  // DARK MODE FUNCTIONS
  // ========================================
  
  function initDarkMode() {
    const isDarkMode = localStorage.getItem(STORAGE.darkMode) === 'true';
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      updateDarkModeIcon(true);
    } else {
      document.documentElement.removeAttribute('data-theme');
      updateDarkModeIcon(false);
    }
  }
  
  function updateDarkModeIcon(isDark) {
    const icon = document.getElementById('darkModeIcon');
    if (icon) {
      icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
  
  // Função global para alternar dark mode
  function toggleDarkMode() {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    const newDarkMode = !isDarkMode;
    
    if (newDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem(STORAGE.darkMode, 'true');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem(STORAGE.darkMode, 'false');
    }
    
    updateDarkModeIcon(newDarkMode);
  }

  // Inicializar dark mode quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
  } else {
    initDarkMode();
  }

  // expor globalmente
  window.viewProfile = viewProfile;
  window.editProfile = editProfile;
  window.changePassword = changePassword;
  window.settings = settings;
  window.logout = logout;
  window.closeUserMenu = closeUserMenu;
  window.toggleDarkMode = toggleDarkMode;
})();


