window.onload = function() {
    fetch('http://localhost:3000/api/pacientes/listar')
      .then(response => response.json())
      .then(data => {
        const pacientesTable = document.getElementById('pacientesTable').getElementsByTagName('tbody')[0];
        
        data.forEach(paciente => {
          const row = pacientesTable.insertRow();
          row.insertCell(0).textContent = paciente.id;
          row.insertCell(1).textContent = paciente.nome;
          row.insertCell(2).textContent = paciente.email;
          row.insertCell(3).textContent = paciente.telefone;
          row.insertCell(4).textContent = paciente.status;
          
          const actionsCell = row.insertCell(5);
          const viewButton = document.createElement('button');
          viewButton.textContent = 'Ver';
          viewButton.onclick = function() {
            window.location.href = `detalhes_paciente.html?id=${paciente.id}`;
          };
          actionsCell.appendChild(viewButton);
        });
      })
      .catch(error => console.error('Erro ao buscar pacientes:', error));
  };
  