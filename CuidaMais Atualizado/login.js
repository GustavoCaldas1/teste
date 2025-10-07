// ========================================
// LOGIN - JAVASCRIPT
// ========================================

// ========================================
// FUNÇÕES DE LOGIN
// ========================================
function handleLogin(event) {
  event.preventDefault();
  
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;
  const rememberMe = document.querySelector('input[type="checkbox"]').checked;
  
  console.log('Tentando fazer login:', { email, rememberMe });
  
  // Validar campos
  if (!email || !password) {
    showError('Por favor, preencha todos os campos');
    return;
  }
  
  if (!validateEmail(email)) {
    showError('Por favor, insira um email válido');
    return;
  }
  
  // Simular login
  showLoading();
  
  setTimeout(() => {
    hideLoading();
    // Simular sucesso do login
    if (email === 'admin@cuidamais.com' && password === '123456') {
      showSuccess();
      // Redirecionar para dashboard
      setTimeout(() => {
        window.location.href = 'home-dashboard.html';
      }, 1000);
    } else {
      showError('Email ou senha incorretos');
    }
  }, 2000);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function togglePassword() {
  const passwordInput = document.querySelector('input[type="password"], input[type="text"]');
  const toggleIcon = document.querySelector('.password-toggle i');
  
  if (!passwordInput || !toggleIcon) {
    console.error('Elementos de senha não encontrados');
    return;
  }
  
  // Lógica correta: olho aberto = senha visível, olho fechado = senha oculta
  if (passwordInput.type === 'password') {
    // Mostrar senha - olho aberto (sem risco)
    passwordInput.type = 'text';
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye');
    toggleIcon.title = 'Ocultar senha';
  } else {
    // Ocultar senha - olho fechado (com risco)
    passwordInput.type = 'password';
    toggleIcon.classList.remove('fa-eye');
    toggleIcon.classList.add('fa-eye-slash');
    toggleIcon.title = 'Mostrar senha';
  }
}

function loginWithGoogle() {
  console.log('Tentando login com Google...');
  // Simular login com Google
  showLoading();
  
  setTimeout(() => {
    hideLoading();
    showSuccess();
    setTimeout(() => {
      window.location.href = 'home-dashboard.html';
    }, 1000);
  }, 1500);
}

// ========================================
// FUNÇÕES DE INTERFACE
// ========================================
function showLoading() {
  const submitBtn = document.querySelector('.btn-login');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
  }
}

function hideLoading() {
  const submitBtn = document.querySelector('.btn-login');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Entrar';
  }
}

function showError(message) {
  // Remover mensagens anteriores
  removeMessages();
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'message error-message';
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-circle"></i>
    ${message}
  `;
  
  const form = document.querySelector('.login-form');
  form.insertBefore(errorDiv, form.firstChild);
  
  // Remover após 5 segundos
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

function showSuccess(message = 'Login realizado com sucesso!') {
  // Remover mensagens anteriores
  removeMessages();
  
  const successDiv = document.createElement('div');
  successDiv.className = 'message success-message';
  successDiv.innerHTML = `
    <i class="fas fa-check-circle"></i>
    ${message}
  `;
  
  const form = document.querySelector('.login-form');
  form.insertBefore(successDiv, form.firstChild);
}

function removeMessages() {
  const messages = document.querySelectorAll('.message');
  messages.forEach(message => message.remove());
}

// ========================================
// FUNÇÕES DE UTILIDADE
// ========================================
function checkRememberMe() {
  const rememberCheckbox = document.querySelector('input[type="checkbox"]');
  const emailInput = document.querySelector('input[type="email"]');
  
  // Carregar dados salvos
  const savedEmail = localStorage.getItem('rememberedEmail');
  if (savedEmail && rememberCheckbox.checked) {
    emailInput.value = savedEmail;
  }
}

function saveRememberMe() {
  const rememberCheckbox = document.querySelector('input[type="checkbox"]');
  const emailInput = document.querySelector('input[type="email"]');
  
  if (rememberCheckbox.checked) {
    localStorage.setItem('rememberedEmail', emailInput.value);
  } else {
    localStorage.removeItem('rememberedEmail');
  }
}

// ========================================
// EVENT LISTENERS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Verificar se há dados salvos
  checkRememberMe();
  
  // Inicializar botão de senha
  initializePasswordToggle();
  
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
  const emailInput = document.querySelector('input[type="email"]');
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = '#dc2626';
      } else {
        this.style.borderColor = '';
      }
    });
  }
  
  // Salvar dados ao marcar "lembrar de mim"
  const rememberCheckbox = document.querySelector('input[type="checkbox"]');
  if (rememberCheckbox) {
    rememberCheckbox.addEventListener('change', saveRememberMe);
  }
  
  // Efeitos de hover nos botões
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-1px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// ========================================
// INICIALIZAÇÃO DO BOTÃO DE SENHA
// ========================================
function initializePasswordToggle() {
  const passwordInput = document.querySelector('input[type="password"]');
  const toggleButton = document.querySelector('.password-toggle');
  const toggleIcon = document.querySelector('.password-toggle i');
  
  if (passwordInput && toggleButton && toggleIcon) {
    // Garantir que comece com olho fechado (senha oculta)
    passwordInput.type = 'password';
    toggleIcon.classList.remove('fa-eye');
    toggleIcon.classList.add('fa-eye-slash');
    toggleIcon.title = 'Mostrar senha';
    
    // Adicionar evento de clique mais robusto
    toggleButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      togglePassword();
    });
    
    // Adicionar evento de teclado para acessibilidade
    toggleButton.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePassword();
      }
    });
    
    // Tornar o botão focável
    toggleButton.setAttribute('tabindex', '0');
    toggleButton.setAttribute('role', 'button');
    toggleButton.setAttribute('aria-label', 'Alternar visibilidade da senha');
    
  } else {
    console.error('Erro ao inicializar botão de senha');
  }
}

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


