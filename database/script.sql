CREATE DATABASE clinicflow;

USE clinicflow;

-- =========================
-- TABLA PACIENTES
-- =========================

CREATE TABLE pacientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero VARCHAR(20) NOT NULL
);

-- =========================
-- TABLA CITAS
-- =========================

CREATE TABLE citas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    paciente_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    motivo TEXT NOT NULL,
    estado ENUM('Pendiente', 'Confirmada', 'Cancelada', 'Finalizada') DEFAULT 'Pendiente',

    CONSTRAINT fk_citas_pacientes
        FOREIGN KEY (paciente_id)
        REFERENCES pacientes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =========================
-- REGISTROS PACIENTES
-- =========================

INSERT INTO pacientes (nombre, telefono, fecha_nacimiento, genero)
VALUES
('Juan Pérez González', '5555-1001', '2000-05-11', 'Masculino'),
('Ale Pérez', '5555-1002', '2000-05-10', 'Masculino'),
('Rudy Morán', '5555-1003', '2000-05-10', 'Masculino'),
('Joane Villatoro', '5555-1004', '2001-06-25', 'Femenino'),
('María López', '5555-1005', '1998-02-14', 'Femenino');

-- =========================
-- REGISTROS CITAS
-- =========================

INSERT INTO citas (paciente_id, fecha, hora, motivo, estado)
VALUES
(1, '2026-05-28', '08:30:00', 'Chequeo general', 'Pendiente'),

(2, '2026-05-28', '09:00:00', 'Dolor de cabeza frecuente', 'Confirmada'),

(3, '2026-05-29', '10:15:00', 'Control médico', 'Pendiente'),

(4, '2026-05-29', '11:00:00', 'Consulta dermatológica', 'Finalizada'),

(5, '2026-05-30', '02:30:00', 'Examen físico', 'Cancelada');

-- =========================
-- CONSULTAS DE PRUEBA
-- =========================

SELECT * FROM pacientes;

SELECT * FROM citas;

SELECT 
    citas.id,
    pacientes.nombre AS paciente,
    citas.fecha,
    citas.hora,
    citas.motivo,
    citas.estado
FROM citas
INNER JOIN pacientes
ON citas.paciente_id = pacientes.id;