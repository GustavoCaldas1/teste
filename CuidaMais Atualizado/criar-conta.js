// ========================================
// CRIAR CONTA - JAVASCRIPT
// ========================================

// ========================================
// VARIÁVEIS GLOBAIS
// ========================================
let currentStep = 1;
const totalSteps = 3;

// ========================================
// FUNÇÕES DE NAVEGAÇÃO
// ========================================
function changeStep(direction) {
  const nextStep = currentStep + direction;
  
  if (nextStep < 1 || nextStep > totalSteps) return;
  
  // Validar step atual antes de avançar
  if (direction > 0 && !validateCurrentStep()) {
    return;
  }
  
  // Esconder step atual
  document.getElementById(`step${currentStep}`).classList.remove('active');
  
  // Atualizar step
  currentStep = nextStep;
  
  // Mostrar novo step
  document.getElementById(`step${currentStep}`).classList.add('active');
  
  // Atualizar progresso
  updateProgress();
  
  // Atualizar botões
  updateNavigationButtons();
  
  console.log(`Mudou para step ${currentStep}`);
}

function updateProgress() {
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  
  const progress = (currentStep / totalSteps) * 100;
  progressFill.style.width = `${progress}%`;
  progressText.textContent = `Passo ${currentStep} de ${totalSteps}`;
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  
  // Botão anterior
  if (currentStep === 1) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'flex';
  }
  
  // Botão próximo/submit
  if (currentStep === totalSteps) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'flex';
  } else {
    nextBtn.style.display = 'flex';
    submitBtn.style.display = 'none';
  }
}

// ========================================
// FUNÇÕES DE VALIDAÇÃO
// ========================================
function validateCurrentStep() {
  const currentStepElement = document.getElementById(`step${currentStep}`);
  const requiredFields = currentStepElement.querySelectorAll('[required]');
  let isValid = true;
  
  // Limpar erros anteriores
  clearErrors();
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      showFieldError(field, 'Este campo é obrigatório');
      isValid = false;
    } else {
      // Validações específicas
      if (field.type === 'email' && !validateEmail(field.value)) {
        showFieldError(field, 'Email inválido');
        isValid = false;
      }
      
      if (field.placeholder && field.placeholder.includes('CPF') && !validateCPF(field.value)) {
        showFieldError(field, 'CPF inválido');
        isValid = false;
      }
      
      if (field.type === 'tel' && !validatePhone(field.value)) {
        showFieldError(field, 'Telefone inválido');
        isValid = false;
      }
    }
  });
  
  // Validação específica do step 3 (senha)
  if (currentStep === 3) {
    const password = document.querySelector('#step3 input[type="password"]').value;
    const confirmPassword = document.querySelectorAll('#step3 input[type="password"]')[1].value;
    
    if (password && !validatePassword(password)) {
      showFieldError(document.querySelector('#step3 input[type="password"]'), 'Senha não atende aos requisitos');
      isValid = false;
    }
    
    if (confirmPassword && password !== confirmPassword) {
      showFieldError(document.querySelectorAll('#step3 input[type="password"]')[1], 'Senhas não coincidem');
      isValid = false;
    }
  }
  
  return isValid;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
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

function validatePhone(phone) {
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return phoneRegex.test(phone);
}

function validatePassword(password) {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /\d/.test(password);
}

// ========================================
// FUNÇÕES DE INTERFACE
// ========================================
function showFieldError(field, message) {
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

function showError(message) {
  removeMessages();
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'message error-message';
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-circle"></i>
    ${message}
  `;
  
  const form = document.querySelector('.signup-form');
  form.insertBefore(errorDiv, form.firstChild);
  
  setTimeout(() => errorDiv.remove(), 5000);
}

function showSuccess(message = 'Conta criada com sucesso!') {
  removeMessages();
  
  const successDiv = document.createElement('div');
  successDiv.className = 'message success-message';
  successDiv.innerHTML = `
    <i class="fas fa-check-circle"></i>
    ${message}
  `;
  
  const form = document.querySelector('.signup-form');
  form.insertBefore(successDiv, form.firstChild);
}

function removeMessages() {
  const messages = document.querySelectorAll('.message');
  messages.forEach(message => message.remove());
}

// ========================================
// FUNÇÕES DE SENHA
// ========================================
function togglePassword() {
  const passwordInput = document.querySelector('#step3 input[type="password"]');
  const toggleButton = document.querySelector('#step3 .password-toggle i');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleButton.classList.remove('fa-eye');
    toggleButton.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    toggleButton.classList.remove('fa-eye-slash');
    toggleButton.classList.add('fa-eye');
  }
}

function toggleConfirmPassword() {
  const passwordInputs = document.querySelectorAll('#step3 input[type="password"]');
  const confirmPasswordInput = passwordInputs[1];
  const toggleButton = document.querySelectorAll('#step3 .password-toggle')[1].querySelector('i');
  
  if (confirmPasswordInput.type === 'password') {
    confirmPasswordInput.type = 'text';
    toggleButton.classList.remove('fa-eye');
    toggleButton.classList.add('fa-eye-slash');
  } else {
    confirmPasswordInput.type = 'password';
    toggleButton.classList.remove('fa-eye-slash');
    toggleButton.classList.add('fa-eye');
  }
}

function updatePasswordRequirements() {
  const password = document.querySelector('#step3 input[type="password"]').value;
  
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password)
  };
  
  Object.keys(requirements).forEach(req => {
    const element = document.getElementById(req);
    const icon = element.querySelector('i');
    
    if (requirements[req]) {
      element.classList.add('valid');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-check');
    } else {
      element.classList.remove('valid');
      icon.classList.remove('fa-check');
      icon.classList.add('fa-times');
    }
  });
}

// ========================================
// FUNÇÕES DE FORMULÁRIO
// ========================================
function handleSubmit(event) {
  event.preventDefault();
  
  if (!validateCurrentStep()) {
    return;
  }
  
  console.log('Criando conta...');
  
  // Simular criação de conta
  showLoading();
  
  setTimeout(() => {
    hideLoading();
    showSuccess();
    
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  }, 2000);
}

function showLoading() {
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Criando conta...';
  }
}

function hideLoading() {
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Criar Conta';
  }
}

// ========================================
// MÁSCARAS DE INPUT
// ========================================
function applyMasks() {
  // Máscara para CPF
  const cpfField = document.querySelector('input[placeholder*="CPF"]');
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
  const phoneField = document.querySelector('input[type="tel"]');
  if (phoneField) {
    phoneField.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/(\d{2})(\d)/, '($1) $2');
      value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
      e.target.value = value;
    });
  }
}

// ========================================
// EVENT LISTENERS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Aplicar máscaras
  applyMasks();
  
  // Atualizar botões iniciais
  updateNavigationButtons();
  
  // Validação de senha em tempo real
  const passwordField = document.querySelector('#step3 input[type="password"]');
  if (passwordField) {
    passwordField.addEventListener('input', updatePasswordRequirements);
  }
  
  // Efeitos de foco nos campos
  const inputs = document.querySelectorAll('.form-input');
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
        showFieldError(this, 'Este campo é obrigatório');
      } else {
        clearErrors();
      }
    });
  });
});

// ========================================
// ESTILOS DINÂMICOS
// ========================================
const style = document.createElement('style');
style.textContent = `
  .message {
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    animation: slideInDown 0.3s ease;
  }
  
  .error-message {
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
  }
  
  .success-message {
    background: #f0fdf4;
    color: #16a34a;
    border: 1px solid #bbf7d0;
  }
  
  .form-group.focused .form-input {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
  
  .form-group.error .form-input {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
  
  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);


