document.getElementById('cadastroPacienteForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const data_nascimento = document.getElementById('data_nascimento').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const status = document.getElementById('status').value;
  
    fetch('http://localhost:3000/api/pacientes/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        data_nascimento,
        email,
        telefone,
        status,
        ultimo_atendimento: new Date().toISOString()
      })
    })
    .then(response => response.json())
    .then(data => {
      alert('Paciente cadastrado com sucesso!');
      window.location.href = 'pacientes.html';  // Redireciona para a página de pacientes
    })
    .catch(error => {
      alert('Erro ao cadastrar paciente!');
      console.error('Erro:', error);
    });
  });
  