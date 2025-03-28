const express = require('express');
const bodyParser = require('body-parser');
const connection = require('db_config');  // Importando a conexão com o banco
const app = express();

// Middleware para parsear JSON
app.use(bodyParser.json());

// Função para cadastrar paciente
app.post('/api/pacientes/cadastrar', (req, res) => {
  const { nome, data_nascimento, email, telefone, status, ultimo_atendimento } = req.body;

  const query = 'INSERT INTO pacientes (nome, data_nascimento, email, telefone, status, ultimo_atendimento) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [nome, data_nascimento, email, telefone, status, ultimo_atendimento], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao cadastrar paciente' });
    }
    res.status(201).json({ message: 'Paciente cadastrado com sucesso!' });
  });
});

// Função para listar pacientes
app.get('/api/pacientes/listar', (req, res) => {
  const query = 'SELECT * FROM pacientes';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao listar pacientes' });
    }
    res.json(results);
  });
});

// Função para buscar paciente por ID
app.get('/api/pacientes/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM pacientes WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar paciente' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.json(results[0]);
  });
});

// Função para atualizar o status de um paciente
app.post('/api/pacientes/atualizarStatus', (req, res) => {
  const { id, status } = req.body;
  const query = 'UPDATE pacientes SET status = ? WHERE id = ?';
  connection.query(query, [status, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar status do paciente' });
    }
    res.json({ message: 'Status atualizado com sucesso!' });
  });
});

// Função para agendar consulta
app.post('/api/consultas/agendar', (req, res) => {
  const { paciente_id, medico_id, data_consulta, observacoes } = req.body;

  const query = 'INSERT INTO consultas (paciente_id, medico_id, data_consulta, observacoes) VALUES (?, ?, ?, ?)';
  connection.query(query, [paciente_id, medico_id, data_consulta, observacoes], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao agendar consulta' });
    }
    res.status(201).json({ message: 'Consulta agendada com sucesso!' });
  });
});

// Função para listar agendamentos
app.get('/api/consultas/listar', (req, res) => {
  const query = 'SELECT * FROM consultas';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao listar consultas' });
    }
    res.json(results);
  });
});

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

// Função para listar todas as consultas de um paciente
app.get('/api/consultas/paciente/:pacienteId', (req, res) => {
  const pacienteId = req.params.pacienteId;
  const query = 'SELECT * FROM consultas WHERE paciente_id = ? ORDER BY data_consulta DESC';
  
  connection.query(query, [pacienteId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar consultas' });
    }
    res.json(results);
  });
});

// Rota para adicionar ou atualizar observações de uma consulta
app.post('/api/consultas/observacoes', (req, res) => {
  const { consultaId, observacoes } = req.body;
  
  const query = 'UPDATE consultas SET observacoes = ? WHERE id = ?';
  connection.query(query, [observacoes, consultaId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao salvar observações' });
    }
    res.json({ message: 'Observações atualizadas com sucesso!' });
  });
});

// Rota para listar todos os exames agendados de um paciente
app.get('/api/exames/paciente/:pacienteId', (req, res) => {
  const pacienteId = req.params.pacienteId;
  const query = 'SELECT * FROM exames WHERE paciente_id = ? ORDER BY data_exame DESC';

  connection.query(query, [pacienteId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar exames' });
    }
    res.json(results);
  });
});

// Rota para atualizar o resultado de um exame
app.post('/api/exames/resultado', (req, res) => {
  const { exameId, resultado } = req.body;
  
  const query = 'UPDATE exames SET resultado = ? WHERE id = ?';
  connection.query(query, [resultado, exameId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar resultado do exame' });
    }
    res.json({ message: 'Resultado do exame atualizado com sucesso!' });
  });
});

