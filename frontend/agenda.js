window.onload = function() {
    fetch('http://localhost:3000/api/consultas/listar')
      .then(response => response.json())
      .then(data => {
        const agendaTable = document.getElementById('agendaTable').getElementsByTagName('tbody')[0];
        
        data.forEach(agendamento => {
          const row = agendaTable.insertRow();
          row.insertCell(0).textContent = agendamento.id;
          row.insertCell(1).textContent = agendamento.paciente_id;  // Substituir por nome de paciente, se necessário
          row.insertCell(2).textContent = new Date(agendamento.data_consulta).toLocaleString();
          row.insertCell(3).textContent = 'Consulta'; // Ou Exame, dependendo do tipo
          const actionsCell = row.insertCell(4);
          const cancelButton = document.createElement('button');
          cancelButton.textContent = 'Cancelar';
          cancelButton.onclick = function() {
            // Lógica para cancelar o agendamento
            alert(`Consulta ${agendamento.id} cancelada!`);
          };
          actionsCell.appendChild(cancelButton);
        });
      })
      .catch(error => console.error('Erro ao buscar agendamentos:', error));
  };
  