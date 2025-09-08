let currentStep = 1;
const totalSteps = 3;

function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  const toggle = field.nextElementSibling;
  const icon = toggle.querySelector('i');
  if (field.type === 'password') {
    field.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    field.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

function nextStep() {
  if (validateCurrentStep()) {
    if (currentStep < totalSteps) {
      document.getElementById(`step${currentStep}-content`).style.display = 'none';
      currentStep++;
      document.getElementById(`step${currentStep}-content`).style.display = 'block';
      updateProgress();
      updateStepIndicator();
    }
  }
}

function prevStep() {
  if (currentStep > 1) {
    document.getElementById(`step${currentStep}-content`).style.display = 'none';
    currentStep--;
    document.getElementById(`step${currentStep}-content`).style.display = 'block';
    updateProgress();
    updateStepIndicator();
  }
}

function updateProgress() {
  const progress = (currentStep / totalSteps) * 100;
  document.getElementById('progressFill').style.width = progress + '%';
}

function updateStepIndicator() {
  for (let i = 1; i <= totalSteps; i++) {
    const step = document.getElementById(`step${i}`);
    step.classList.remove('active', 'completed');
    if (i < currentStep) {
      step.classList.add('completed');
    } else if (i === currentStep) {
      step.classList.add('active');
    }
  }
}

function validateCurrentStep() {
  let isValid = true;
  const currentStepElement = document.getElementById(`step${currentStep}-content`);
  const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
  currentStepElement.querySelectorAll('.error-message').forEach(msg => { msg.style.display = 'none'; });
  inputs.forEach(input => {
    if (!input.value.trim()) {
      showError(input.id, input.id + '-error');
      isValid = false;
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
      showError(input.id, input.id + '-error');
      isValid = false;
    } else if (input.id === 'cpf' && !isValidCPF(input.value)) {
      showError(input.id, input.id + '-error');
      isValid = false;
    } else if (input.id === 'phone' && !isValidPhone(input.value)) {
      showError(input.id, input.id + '-error');
      isValid = false;
    }
  });
  if (currentStep === 3) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password.length < 8) {
      showError('password', 'password-error');
      isValid = false;
    }
    if (password !== confirmPassword) {
      showError('confirmPassword', 'confirmPassword-error');
      isValid = false;
    }
  }
  return isValid;
}

function showError(inputId, errorId) {
  document.getElementById(errorId).style.display = 'block';
  document.getElementById(inputId).style.borderColor = '#dc2626';
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidCPF(cpf) {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return cpfRegex.test(cpf);
}

function isValidPhone(phone) {
  const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
  return phoneRegex.test(phone);
}

document.addEventListener('DOMContentLoaded', function() {
  const cpfEl = document.getElementById('cpf');
  if (cpfEl) {
    cpfEl.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        e.target.value = value;
      }
    });
  }
  const phoneEl = document.getElementById('phone');
  if (phoneEl) {
    phoneEl.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        e.target.value = value;
      }
    });
  }
  const form = document.getElementById('signupForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateCurrentStep()) {
        const submitBtn = document.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Criando conta...';
        setTimeout(() => {
          if (confirm('Conta criada com sucesso! Deseja ir para a tela de login?')) {
            window.location.href = 'login.html';
          }
        }, 2000);
      }
    });
  }
  updateProgress();
  updateStepIndicator();
});

function goToLogin() { window.location.href = 'login.html'; }
function showTerms() { alert('Termos de Uso do Cuida Mais\n\n1. Uso responsável do sistema\n2. Confidencialidade dos dados\n3. Conformidade com LGPD\n4. Responsabilidades do usuário'); }
function showPrivacy() { alert('Política de Privacidade\n\nSeus dados são protegidos e utilizados apenas para fins médicos e administrativos, em conformidade com a LGPD.'); }



