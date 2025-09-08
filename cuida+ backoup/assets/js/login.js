function openCreateAccount() {
  window.location.href = 'criar-conta.html';
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const userId = document.getElementById('user-id').value;
    const password = document.getElementById('password').value;
    if (userId && password) {
      alert('Login realizado com sucesso! Redirecionando para o dashboard...');
      window.location.href = 'home-dashboard.html';
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  });
});



