
    // Função para resetar o formulário
    function resetForm() {
      if (confirm('Tem certeza que deseja limpar todos os dados do formulário?')) {
        document.getElementById('requestForm').reset();
        clearErrors();
        // Definir data e hora atual
        const now = new Date();
        document.getElementById('request-date').value = now.toISOString().split('T')[0];
        document.getElementById('request-time').value = now.toTimeString().slice(0, 5);
      }
    }

    // Função para limpar erros
    function clearErrors() {
      document.querySelectorAll('.form-group.error').forEach(group => {
        group.classList.remove('error');
      });
      document.querySelectorAll('.error-message').forEach(msg => {
        msg.remove();
      });
    }

    // Função para mostrar erro
    function showError(fieldId, message) {
      const field = document.getElementById(fieldId);
      const formGroup = field.closest('.form-group');
      
      formGroup.classList.add('error');
      
      // Remover mensagem de erro existente
      const existingError = formGroup.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }
      
      // Adicionar nova mensagem de erro
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;
      formGroup.appendChild(errorDiv);
    }

    // Função para validar formulário
    function validateForm() {
      clearErrors();
      let isValid = true;

      // Validar ID do paciente
      const patientId = document.getElementById('patient-id').value.trim();
      if (!patientId) {
        showError('patient-id', 'ID do paciente é obrigatório');
        isValid = false;
      } else if (patientId.length < 3) {
        showError('patient-id', 'ID do paciente deve ter pelo menos 3 caracteres');
        isValid = false;
      }

      // Validar data
      const requestDate = document.getElementById('request-date').value;
      if (!requestDate) {
        showError('request-date', 'Data é obrigatória');
        isValid = false;
      }

      // Validar hora
      const requestTime = document.getElementById('request-time').value;
      if (!requestTime) {
        showError('request-time', 'Hora é obrigatória');
        isValid = false;
      }

      // Validar nível de urgência
      const urgencyLevel = document.getElementById('urgency-level').value;
      if (!urgencyLevel) {
        showError('urgency-level', 'Nível de urgência é obrigatório');
        isValid = false;
      }

      return isValid;
    }

    // Manipulador de envio do formulário
    document.getElementById('requestForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm()) {
        // Coletar dados do formulário
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simular envio
        const submitBtn = document.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          alert('Requisição registrada com sucesso!');
          this.reset();
          clearErrors();
          
          // Definir data e hora atual
          const now = new Date();
          document.getElementById('request-date').value = now.toISOString().split('T')[0];
          document.getElementById('request-time').value = now.toTimeString().slice(0, 5);
          
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 2000);
      }
    });

    // Função para toggle do menu do usuário
    function toggleUserMenu() {
      alert('Menu do usuário - Em desenvolvimento');
    }

    // Inicialização
    document.addEventListener('DOMContentLoaded', function() {
      // Definir data e hora atual
      const now = new Date();
      document.getElementById('request-date').value = now.toISOString().split('T')[0];
      document.getElementById('request-time').value = now.toTimeString().slice(0, 5);
      
      // Auto-resize para textareas
      document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', function() {
          this.style.height = 'auto';
          this.style.height = this.scrollHeight + 'px';
        });
      });
    });

    // Validação em tempo real
    document.getElementById('patient-id').addEventListener('blur', function() {
      const value = this.value.trim();
      if (value && value.length < 3) {
        showError('patient-id', 'ID do paciente deve ter pelo menos 3 caracteres');
      } else {
        clearErrors();
      }
    });
    // Busca global em registrar-dados
    (function attachGlobalSearch(){
      const input = document.getElementById('global-search');
      if (!input) return;
      input.addEventListener('keypress', function(e){
        if (e.key === 'Enter') {
          e.preventDefault();
          const term = input.value.trim();
          if (term) window.location.href = `pesquisa-pacientes.html?search=${encodeURIComponent(term)}`;
        }
      });
    })();
  


    // Função para resetar o formulário

    function resetForm() {

      if (confirm('Tem certeza que deseja limpar todos os dados do formulário?')) {

        document.getElementById('requestForm').reset();

        clearErrors();

        // Definir data e hora atual

        const now = new Date();

        document.getElementById('request-date').value = now.toISOString().split('T')[0];

        document.getElementById('request-time').value = now.toTimeString().slice(0, 5);

      }

    }



    // Função para limpar erros

    function clearErrors() {

      document.querySelectorAll('.form-group.error').forEach(group => {

        group.classList.remove('error');

      });

      document.querySelectorAll('.error-message').forEach(msg => {

        msg.remove();

      });

    }



    // Função para mostrar erro

    function showError(fieldId, message) {

      const field = document.getElementById(fieldId);

      const formGroup = field.closest('.form-group');

      

      formGroup.classList.add('error');

      

      // Remover mensagem de erro existente

      const existingError = formGroup.querySelector('.error-message');

      if (existingError) {

        existingError.remove();

      }

      

      // Adicionar nova mensagem de erro

      const errorDiv = document.createElement('div');

      errorDiv.className = 'error-message';

      errorDiv.textContent = message;

      formGroup.appendChild(errorDiv);

    }



    // Função para validar formulário

    function validateForm() {

      clearErrors();

      let isValid = true;



      // Validar ID do paciente

      const patientId = document.getElementById('patient-id').value.trim();

      if (!patientId) {

        showError('patient-id', 'ID do paciente é obrigatório');

        isValid = false;

      } else if (patientId.length < 3) {

        showError('patient-id', 'ID do paciente deve ter pelo menos 3 caracteres');

        isValid = false;

      }



      // Validar data

      const requestDate = document.getElementById('request-date').value;

      if (!requestDate) {

        showError('request-date', 'Data é obrigatória');

        isValid = false;

      }



      // Validar hora

      const requestTime = document.getElementById('request-time').value;

      if (!requestTime) {

        showError('request-time', 'Hora é obrigatória');

        isValid = false;

      }



      // Validar nível de urgência

      const urgencyLevel = document.getElementById('urgency-level').value;

      if (!urgencyLevel) {

        showError('urgency-level', 'Nível de urgência é obrigatório');

        isValid = false;

      }



      return isValid;

    }



    // Manipulador de envio do formulário

    document.getElementById('requestForm').addEventListener('submit', function(e) {

      e.preventDefault();

      

      if (validateForm()) {

        // Coletar dados do formulário

        const formData = new FormData(this);

        const data = Object.fromEntries(formData);

        

        // Simular envio

        const submitBtn = document.querySelector('button[type="submit"]');

        const originalText = submitBtn.innerHTML;

        

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';

        submitBtn.disabled = true;

        

        setTimeout(() => {

          alert('Requisição registrada com sucesso!');

          this.reset();

          clearErrors();

          

          // Definir data e hora atual

          const now = new Date();

          document.getElementById('request-date').value = now.toISOString().split('T')[0];

          document.getElementById('request-time').value = now.toTimeString().slice(0, 5);

          

          submitBtn.innerHTML = originalText;

          submitBtn.disabled = false;

        }, 2000);

      }

    });



    // Função para toggle do menu do usuário

    function toggleUserMenu() {

      alert('Menu do usuário - Em desenvolvimento');

    }



    // Inicialização

    document.addEventListener('DOMContentLoaded', function() {

      // Definir data e hora atual

      const now = new Date();

      document.getElementById('request-date').value = now.toISOString().split('T')[0];

      document.getElementById('request-time').value = now.toTimeString().slice(0, 5);

      

      // Auto-resize para textareas

      document.querySelectorAll('textarea').forEach(textarea => {

        textarea.addEventListener('input', function() {

          this.style.height = 'auto';

          this.style.height = this.scrollHeight + 'px';

        });

      });

    });



    // Validação em tempo real

    document.getElementById('patient-id').addEventListener('blur', function() {

      const value = this.value.trim();

      if (value && value.length < 3) {

        showError('patient-id', 'ID do paciente deve ter pelo menos 3 caracteres');

      } else {

        clearErrors();

      }

    });

  
