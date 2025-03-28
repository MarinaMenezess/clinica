document.getElementById('salvarObservacoesConsulta').addEventListener('click', function() {
    const observacoes = document.getElementById('observacoesConsulta').value;
  
    fetch('http://localhost:3000/api/consultas/observacoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        consultaId: consultaId,  // O ID da consulta a ser atualizado
        observacoes: observacoes
      })
    })
    .then(response => response.json())
    .then(data => {
      alert('Observações salvas com sucesso!');
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao salvar observações!');
    });
  });
  