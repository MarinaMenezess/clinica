document.getElementById('agendarConsultaForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const paciente_id = document.getElementById('paciente_id').value;
    const data_consulta = document.getElementById('data_consulta').value;
    const observacoes = document.getElementById('observacoes').value;
  
    fetch('http://localhost:3000/api/consultas/agendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paciente_id,
        medico_id: 1, // Supondo que o médico é o ID 1, mas pode ser dinâmico
        data_consulta,
        observacoes
      })
    })
    .then(response => response.json())
    .then(data => {
      alert('Consulta agendada com sucesso!');
      window.location.href = 'agenda.html';  // Redireciona para a página de agenda
    })
    .catch(error => {
      alert('Erro ao agendar consulta!');
      console.error('Erro:', error);
    });
  });
  