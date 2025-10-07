// ========================================
// REGISTRAR DADOS - JAVASCRIPT
// ========================================

// ========================================
// FUNÇÕES DE FORMULÁRIO
// ========================================
function handleSubmit(event) {
  event.preventDefault();
  
  console.log('Enviando formulário de registro...');
  
  // Validar formulário
  if (validateForm()) {
    // Simular envio
    showLoading();
    
    setTimeout(() => {
      hideLoading();
      showSuccess();
    }, 2000);
  }
}

function validateForm() {
  let isValid = true;
  
  // Limpar erros anteriores
  clearErrors();
  
  // Validar campos obrigatórios
  const requiredFields = document.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      showError(field, 'Este campo é obrigatório');
      isValid = false;
    }
  });
  
  // Validar CPF
  const cpfField = document.querySelector('input[type="text"][placeholder*="CPF"]');
  if (cpfField && cpfField.value && !validateCPF(cpfField.value)) {
    showError(cpfField, 'CPF inválido');
    isValid = false;
  }
  
  // Validar email
  const emailField = document.querySelector('input[type="email"]');
  if (emailField && emailField.value && !validateEmail(emailField.value)) {
    showError(emailField, 'Email inválido');
    isValid = false;
  }
  
  // Validar telefone
  const phoneFields = document.querySelectorAll('input[type="tel"]');
  phoneFields.forEach(field => {
    if (field.value && !validatePhone(field.value)) {
      showError(field, 'Telefone inválido');
      isValid = false;
    }
  });
  
  return isValid;
}

function showError(field, message) {
  const formGroup = field.closest('.form-group');
  formGroup.classList.add('error');
  
  let errorMessage = formGroup.querySelector('.error-message');
  if (!errorMessage) {
    errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    formGroup.appendChild(errorMessage);
  }
  
  errorMessage.textContent = message;
}

function clearErrors() {
  const errorGroups = document.querySelectorAll('.form-group.error');
  errorGroups.forEach(group => {
    group.classList.remove('error');
  });
  
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(message => {
    message.remove();
  });
}

// ========================================
// FUNÇÕES DE VALIDAÇÃO
// ========================================
function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11) return false;
  
  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  // Validar dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;
  
  return true;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return phoneRegex.test(phone);
}

// ========================================
// FUNÇÕES DE INTERFACE
// ========================================
function showLoading() {
  const submitBtn = document.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';
  }
}

function hideLoading() {
  const submitBtn = document.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Registrar Requisição';
  }
}

function showSuccess() {
  alert('Requisição registrada com sucesso!');
  // Redirecionar ou limpar formulário
  window.location.href = 'home-dashboard.html';
}

function cancelForm() {
  if (confirm('Tem certeza que deseja cancelar? Todos os dados serão perdidos.')) {
    window.location.href = 'home-dashboard.html';
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
// MÁSCARAS DE INPUT
// ========================================
function applyMasks() {
  // Máscara para CPF
  const cpfField = document.querySelector('input[type="text"][placeholder*="CPF"]');
  if (cpfField) {
    cpfField.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      e.target.value = value;
    });
  }
  
  // Máscara para telefone
  const phoneFields = document.querySelectorAll('input[type="tel"]');
  phoneFields.forEach(field => {
    field.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/(\d{2})(\d)/, '($1) $2');
      value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
      e.target.value = value;
    });
  });
}

// ========================================
// FUNÇÕES DE PROGRESSO
// ========================================
function updateProgress() {
  const form = document.querySelector('.registration-form');
  const sections = form.querySelectorAll('.form-section');
  const filledSections = Array.from(sections).filter(section => {
    const inputs = section.querySelectorAll('input, select, textarea');
    return Array.from(inputs).some(input => input.value.trim() !== '');
  });
  
  const progress = (filledSections.length / sections.length) * 100;
  
  // Atualizar barra de progresso se existir
  const progressFill = document.querySelector('.progress-fill');
  if (progressFill) {
    progressFill.style.width = progress + '%';
  }
  
  // Atualizar texto de progresso se existir
  const progressText = document.querySelector('.progress-text');
  if (progressText) {
    progressText.textContent = `${Math.round(progress)}% preenchido`;
  }
}

// ========================================
// EVENT LISTENERS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Aplicar máscaras
  applyMasks();
  
  // Atualizar progresso em tempo real
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', updateProgress);
    input.addEventListener('change', updateProgress);
  });
  
  // Efeitos de foco nos campos
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
  
  // Validação em tempo real
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.hasAttribute('required') && !this.value.trim()) {
        showError(this, 'Este campo é obrigatório');
      } else {
        clearErrors();
      }
    });
  });
});

// ========================================
// REGISTRO GLOBAL DAS FUNÇÕES
// ========================================
window.saveData = saveData;
window.cancelData = cancelData;
window.toggleUserMenu = toggleUserMenu;
window.addNeed = addNeed;
window.removeNeed = removeNeed;
window.addMedication = addMedication;
window.removeMedication = removeMedication;
window.addAllergy = addAllergy;
window.removeAllergy = removeAllergy;
window.addVitalSign = addVitalSign;
window.removeVitalSign = removeVitalSign;
window.addNote = addNote;
window.removeNote = removeNote;
window.viewProfile = viewProfile;
window.editProfile = editProfile;
window.changePassword = changePassword;
window.settings = settings;
window.logout = logout;
window.closeUserMenu = closeUserMenu;

console.log('Todas as funções foram registradas globalmente');

