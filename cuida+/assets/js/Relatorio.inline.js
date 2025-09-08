
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: ['Jul 22', 'Jul 23', 'Jul 24', 'Jul 25', 'Jul 26', 'Jul 27', 'Jul 28'],
        datasets: [{
          label: 'Número de Alertas',
          data: [8, 12, 16, 14, 20, 24, 30],
          borderColor: '#673ab7',
          backgroundColor: 'rgba(103,58,183,0.1)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });

    const ctxBar = document.getElementById('barChart').getContext('2d');
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Crítico', 'Alto', 'Médio', 'Baixo'],
        datasets: [{
          label: 'Quantidade',
          data: [15, 30, 45, 30],
          backgroundColor: ['#f44336', '#ff9800', '#3f51b5', '#9e9e9e']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  
