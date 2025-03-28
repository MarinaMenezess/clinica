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
};
