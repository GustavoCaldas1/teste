// ========================================
// ALERTAS - JAVASCRIPT
// ========================================

// Verificar se o arquivo foi carregado
console.log('Arquivo alertas.js carregado com sucesso!');

// ========================================
// FUNÇÕES DE NAVEGAÇÃO
// ========================================
function viewPatientProfile() {
  console.log('Visualizando perfil do paciente...');
  window.location.href = 'perfil-paciente.html';
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
// FUNÇÕES DE STATUS
// ========================================
function markAsInProgress() {
  console.log('Marcando alerta como em atendimento...');
  
  if (confirm('Deseja marcar este alerta como "Em Atendimento"?')) {
    showLoading();
    
    setTimeout(() => {
      updateAlertStatus('in-progress');
      hideLoading();
      showSuccess('Alerta marcado como "Em Atendimento"');
      updateActionButtons('in-progress');
    }, 1000);
  }
}

function markAsResolved() {
  console.log('Marcando alerta como resolvido...');
  
  if (confirm('Deseja marcar este alerta como "Resolvido"?')) {
    console.log('Usuário confirmou - iniciando processo...');
    showLoading();
    
    setTimeout(() => {
      console.log('Atualizando status para resolved...');
      updateAlertStatus('resolved');
      hideLoading();
      showSuccess('Alerta marcado como "Resolvido"');
      updateActionButtons('resolved');
      console.log('Processo concluído!');
    }, 1000);
  } else {
    console.log('Usuário cancelou a operação');
  }
}

function archiveAlert() {
  console.log('Arquivando alerta...');
  
  if (confirm('Deseja arquivar este alerta? Esta ação não pode ser desfeita.')) {
    // Simular arquivamento
    showLoading();
    
    setTimeout(() => {
      hideLoading();
      showSuccess('Alerta arquivado com sucesso!');
      // Redirecionar para lista de alertas
      setTimeout(() => {
        window.location.href = 'relatorios.html';
      }, 2000);
    }, 1500);
  }
}

function updateAlertStatus(status) {
  console.log('Atualizando status do alerta para:', status);
  const statusSteps = document.querySelectorAll('.status-step');
  console.log('Encontrados', statusSteps.length, 'status steps');
  
  // Remover classes de todos os steps
  statusSteps.forEach((step, index) => {
    step.classList.remove('active', 'completed');
    console.log(`Step ${index} classes removidas`);
  });
  
  // Adicionar classes baseado no status
  if (status === 'in-progress') {
    statusSteps[0].classList.add('completed');
    statusSteps[1].classList.add('active');
    console.log('Status definido como: in-progress');
  } else if (status === 'resolved') {
    statusSteps[0].classList.add('completed');
    statusSteps[1].classList.add('completed');
    statusSteps[2].classList.add('active');
    console.log('Status definido como: resolved');
  } else {
    statusSteps[0].classList.add('active');
    console.log('Status definido como: aberto');
  }
}


function updateActionButtons(status) {
  const buttons = document.querySelectorAll('.action-buttons .btn');
  
  // Resetar todos os botões
  buttons.forEach(btn => {
    btn.classList.remove('btn-primary', 'btn-secondary', 'btn-danger');
    btn.classList.add('btn-secondary');
    btn.disabled = false;
  });
  
  // Atualizar botões baseado no status
  if (status === 'in-progress') {
    buttons[0].classList.remove('btn-secondary');
    buttons[0].classList.add('btn-primary');
    buttons[0].disabled = true;
  } else if (status === 'resolved') {
    buttons[0].disabled = true;
    buttons[1].classList.remove('btn-secondary');
    buttons[1].classList.add('btn-primary');
    buttons[1].disabled = true;
    buttons[2].classList.remove('btn-secondary');
    buttons[2].classList.add('btn-danger');
  }
}

// ========================================
// FUNÇÕES DE COMENTÁRIOS
// ========================================
function addComment(event) {
  event.preventDefault();
  
  const commentText = document.querySelector('.comment-form textarea').value;
  
  if (!commentText.trim()) {
    showError('Por favor, digite um comentário');
    return;
  }
  
  if (commentText.trim().length < 10) {
    showError('O comentário deve ter pelo menos 10 caracteres');
    return;
  }
  
  console.log('Adicionando comentário:', commentText);
  
  // Simular adição de comentário
  showLoading();
  
  setTimeout(() => {
    hideLoading();
    addCommentToList(commentText);
    clearCommentForm();
    showSuccess('Comentário adicionado com sucesso!');
  }, 1000);
}

function addCommentToList(commentText) {
  const commentsList = document.querySelector('.comments-list');
  const currentTime = new Date().toLocaleString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  const commentItem = document.createElement('div');
  commentItem.className = 'comment-item';
  commentItem.innerHTML = `
    <div class="comment-header">
      <div class="comment-author">Você</div>
      <div class="comment-time">${currentTime}</div>
    </div>
    <div class="comment-text">
      ${commentText}
    </div>
  `;
  
  // Adicionar no topo da lista
  commentsList.insertBefore(commentItem, commentsList.firstChild);
  
  // Animação de entrada
  commentItem.style.opacity = '0';
  commentItem.style.transform = 'translateY(-20px)';
  
  setTimeout(() => {
    commentItem.style.transition = 'all 0.3s ease';
    commentItem.style.opacity = '1';
    commentItem.style.transform = 'translateY(0)';
  }, 100);
}

function clearCommentForm() {
  document.querySelector('.comment-form textarea').value = '';
}

// ========================================
// FUNÇÕES DE INTERFACE
// ========================================
function showLoading() {
  const buttons = document.querySelectorAll('.action-buttons .btn');
  buttons.forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = '0.6';
  });
  
  // Mostrar indicador de loading no botão de comentário
  const commentBtn = document.querySelector('.comment-form button[type="submit"]');
  if (commentBtn) {
    commentBtn.disabled = true;
    commentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  }
}

function hideLoading() {
  const buttons = document.querySelectorAll('.action-buttons .btn');
  buttons.forEach(btn => {
    btn.disabled = false;
    btn.style.opacity = '1';
  });
  
  // Restaurar botão de comentário
  const commentBtn = document.querySelector('.comment-form button[type="submit"]');
  if (commentBtn) {
    commentBtn.disabled = false;
    commentBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Comentário';
  }
}

function showSuccess(message) {
  // Remover mensagens anteriores
  removeMessages();
  
  const successDiv = document.createElement('div');
  successDiv.className = 'message success-message';
  successDiv.innerHTML = `
    <i class="fas fa-check-circle"></i>
    ${message}
  `;
  
  const main = document.querySelector('.app-main');
  main.insertBefore(successDiv, main.firstChild);
  
  setTimeout(() => successDiv.remove(), 3000);
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
  
  const main = document.querySelector('.app-main');
  main.insertBefore(errorDiv, main.firstChild);
  
  setTimeout(() => errorDiv.remove(), 5000);
}

function removeMessages() {
  const messages = document.querySelectorAll('.message');
  messages.forEach(message => message.remove());
}

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
// EVENT LISTENERS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Efeitos de hover nos botões de ação
  const actionButtons = document.querySelectorAll('.action-buttons .btn');
  actionButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
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
  
  // Validação em tempo real do comentário
  const commentTextarea = document.querySelector('.comment-form textarea');
  if (commentTextarea) {
    commentTextarea.addEventListener('input', function() {
      const submitBtn = document.querySelector('.comment-form button[type="submit"]');
      if (this.value.trim()) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
      }
    });
  }
});

// ========================================
// ESTILOS DINÂMICOS
// ========================================
const style = document.createElement('style');
style.textContent = `
  .message {
    position: fixed;
    top: 100px;
    right: 24px;
    padding: 12px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 1000;
    animation: slideInRight 0.3s ease;
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
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .comment-form button[type="submit"]:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
document.head.appendChild(style);

// ========================================
// REGISTRO GLOBAL DAS FUNÇÕES
// ========================================
window.markAsResolved = markAsResolved;
window.markAsInProgress = markAsInProgress;
window.archiveAlert = archiveAlert;
window.viewPatientProfile = viewPatientProfile;
window.toggleUserMenu = toggleUserMenu;
window.addComment = addComment;
window.viewProfile = viewProfile;
window.editProfile = editProfile;
window.changePassword = changePassword;
window.settings = settings;
window.logout = logout;
window.closeUserMenu = closeUserMenu;

console.log('Todas as funções foram registradas globalmente');
