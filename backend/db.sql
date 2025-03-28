CREATE DATABASE clinica;

USE clinica;

CREATE TABLE medicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(100) NOT NULL
);

CREATE TABLE pacientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  data_nascimento DATE,
  email VARCHAR(100),
  telefone VARCHAR(20),
  status ENUM('ativo', 'alerta') DEFAULT 'ativo',
  ultimo_atendimento DATE
);

CREATE TABLE consultas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT,
  medico_id INT,
  data_consulta DATETIME,
  observacoes TEXT,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
  FOREIGN KEY (medico_id) REFERENCES medicos(id)
);

CREATE TABLE exames (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT,
  tipo_exame VARCHAR(100),
  data_exame DATETIME,
  resultado TEXT,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);
