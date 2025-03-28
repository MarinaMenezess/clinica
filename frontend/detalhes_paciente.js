// Obtém o ID do paciente da URL
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('id');

window.onload = function() {
  // Buscar os dados do paciente
  fetch(`http://localhost:3000/api/pacientes/${pacienteId}`)
    .then(response => response.json())
    .then(data => {
      const pacienteInfo = document.getElementById('pacienteInfo');
      
      pacienteInfo.innerHTML = `
        <p><strong>Nome:</strong> ${data.nome}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefone:</strong> ${data.telefone}</p>
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Último Atendimento:</strong> ${new Date(data.ultimo_atendimento).toLocaleDateString()}</p>
      `;
    })
    .catch(error => {
      console.error('Erro ao buscar dados do paciente:', error);
    });

  // Salvar observações
  document.getElementById('salvarObservacoes').addEventListener('click', function() {
    const observacoes = document.getElementById('observacoes').value;
    
    // Aqui você pode adicionar a lógica de salvar observações no banco de dados, se necessário
    alert('Observações salvas!');
  });

  // Fetch consultas passadas de um paciente
  fetch(`http://localhost:3000/api/consultas/paciente/${pacienteId}`)
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById('consultasPassadasTable').getElementsByTagName('tbody')[0];
    
    data.forEach(consulta => {
      const row = tableBody.insertRow();
      row.insertCell(0).textContent = new Date(consulta.data_consulta).toLocaleString();
      row.insertCell(1).textContent = consulta.observacoes || 'Sem observações';
    });
  })
  .catch(error => console.error('Erro ao buscar consultas:', error));

  // Fetch exames agendados de um paciente
  fetch(`http://localhost:3000/api/exames/paciente/${pacienteId}`)
  .then(response => response.json())
  .then(data => {
    const examesTable = document.getElementById('examesTable').getElementsByTagName('tbody')[0];
    
    data.forEach(exame => {
      const row = examesTable.insertRow();
      row.insertCell(0).textContent = new Date(exame.data_exame).toLocaleString();
      row.insertCell(1).textContent = exame.tipo_exame;
      row.insertCell(2).textContent = exame.resultado || 'Aguardando resultado';
      
      const actionsCell = row.insertCell(3);
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Atualizar Resultado';
      updateButton.onclick = function() {
        const novoResultado = prompt('Digite o novo resultado:');
        if (novoResultado) {
          fetch('http://localhost:3000/api/exames/resultado', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              exameId: exame.id,
              resultado: novoResultado
            })
          })
          .then(response => response.json())
          .then(data => {
            alert('Resultado atualizado!');
            window.location.reload();  // Recarregar a página para mostrar os resultados atualizados
          })
          .catch(error => {
            console.error('Erro ao atualizar resultado do exame:', error);
            alert('Erro ao atualizar resultado!');
          });
        }
      };
      actionsCell.appendChild(updateButton);
    });
  })
  .catch(error => console.error('Erro ao buscar exames:', error));

};
