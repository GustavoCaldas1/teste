document.addEventListener('DOMContentLoaded', function() {
  const filterUrgency = document.getElementById('filterUrgency');
  const filterStatus = document.getElementById('filterStatus');
  const table = document.getElementById('alertsTable');
  function applyFilters() {
    const urgency = filterUrgency.value;
    const status = filterStatus.value;
    Array.from(table.querySelectorAll('tbody tr')).forEach(row => {
      const urgencyText = row.querySelector('td:nth-child(4) .badge').textContent.trim();
      const statusText = row.querySelector('td:nth-child(6) .badge').textContent.trim();
      const matchesUrgency = urgency ? urgencyText === urgency : true;
      const matchesStatus = status ? statusText === status : true;
      row.style.display = (matchesUrgency && matchesStatus) ? '' : 'none';
    });
  }
  filterUrgency.addEventListener('change', applyFilters);
  filterStatus.addEventListener('change', applyFilters);
});



