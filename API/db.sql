/* =========================================================
   1. ROLES, CARRERAS Y USUARIOS
   ========================================================= */

CREATE TABLE roles (
    id_role INT PRIMARY KEY AUTO_INCREMENT,
    name    VARCHAR(100)
);

INSERT INTO roles (id_role, name) VALUES
(1, 'Administrador'),
(2, 'Graduado'),
(3, 'Facilitador');

CREATE TABLE career (
    id_career INT PRIMARY KEY AUTO_INCREMENT,
    area      VARCHAR(100),
    name      VARCHAR(100)
);

INSERT INTO career (id_career, area, name) VALUES
(1, 'Tecnología', 'Ingeniería en Sistemas'),
(2, 'Educación',  'Docencia General');

CREATE TABLE users (
    id_user         INT PRIMARY KEY AUTO_INCREMENT,
    first_name      VARCHAR(100),
    last_name1      VARCHAR(100),
    last_name2      VARCHAR(100),
    identity_number VARCHAR(20) UNIQUE,
    email           VARCHAR(100),
    phone           VARCHAR(20),
    address         VARCHAR(255),
    password        VARCHAR(255),
    id_role         INT,
    FOREIGN KEY (id_role) REFERENCES roles(id_role)
);

INSERT INTO users
(id_user, first_name, last_name1, last_name2, identity_number, email, phone, address, password, id_role) VALUES
(1, 'Ana',  'Ramírez',    'Mora',     '10101010', 'admin@email.com', '8888‑0000', 'San José',
 '$2b$10$OgFTWYvsioqVqhdS.Pow6uZZevjO7ammN0r0kqcgfLTa45fA9RDEm', 1),
(2, 'Luis', 'Gómez',      'Alvarado', '20223333', 'grad1@email.com', '8888‑8888', 'Cartago',
 '$2b$10$OgFTWYvsioqVqhdS.Pow6uZZevjO7ammN0r0kqcgfLTa45fA9RDEm', 2),
(3, 'María','Fernández',  'Solís',    '30334444', 'fac1@email.com', '8222‑2222', 'Heredia',
 '$2b$10$OgFTWYvsioqVqhdS.Pow6uZZevjO7ammN0r0kqcgfLTa45fA9RDEm', 3);

/* =========================================================
   2. GRADUADOS Y FACILITADORES
   ========================================================= */

CREATE TABLE graduates (
    id_graduate      INT PRIMARY KEY,                -- FK → users.id_user
    graduation_year  YEAR,
    id_career        INT,
    category         VARCHAR(50),
    work_phone       VARCHAR(20),
    FOREIGN KEY (id_graduate) REFERENCES users(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_career)   REFERENCES career(id_career)
);

INSERT INTO graduates
(id_graduate, graduation_year, id_career, category, work_phone) VALUES
(2, 2022, 1, 'default', '8000‑2222');

CREATE TABLE speakers (
    id_speaker  INT PRIMARY KEY,                     -- FK → users.id_user
    specialty   VARCHAR(100),
    work_phone  VARCHAR(20),
    FOREIGN KEY (id_speaker) REFERENCES users(id_user)
);

INSERT INTO speakers (id_speaker, specialty, work_phone) VALUES
(3, 'Desarrollo Web y Bases de Datos', '8777‑3333');

/* =========================================================
   3. CURSOS Y RELACIONES
   ========================================================= */

CREATE TABLE courses (
    id_course    INT PRIMARY KEY AUTO_INCREMENT,
    name_course  VARCHAR(100),
    description  TEXT,
    date_course  DATE,
    time_course  TIME,
    modality     VARCHAR(50),
    id_speaker   INT,
    FOREIGN KEY (id_speaker) REFERENCES speakers(id_speaker)
);

INSERT INTO courses
(name_course, description, date_course, time_course, modality, id_speaker) VALUES
('Curso de React Básico', 'Aprende los fundamentos de React.js', '2024‑07‑15',
 '10:00:00', 'Virtual', 3);

CREATE TABLE course_graduate (
    id_course     INT,
    id_graduate   INT,
    completed     TINYINT(1) DEFAULT 0,
    completed_at  DATETIME      NULL,
    PRIMARY KEY (id_course, id_graduate),
    FOREIGN KEY (id_course)   REFERENCES courses(id_course),
    FOREIGN KEY (id_graduate) REFERENCES graduates(id_graduate)
);

CREATE TABLE career_course (
    id_career INT,
    id_course INT,
    PRIMARY KEY (id_career, id_course),
    FOREIGN KEY (id_career) REFERENCES career(id_career),
    FOREIGN KEY (id_course) REFERENCES courses(id_course)
);

/* =========================================================
   4. PREFERENCIAS, CATEGORÍAS DE CURSO
   ========================================================= */

CREATE TABLE preference_options (
    id_option INT PRIMARY KEY AUTO_INCREMENT,
    name      VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO preference_options (name) VALUES
('Tecnología'),
('Educación'),
('Presencial'),
('Virtual'),
('Desarrollo Web'),
('Bases de Datos');

CREATE TABLE graduate_preferences (
    id_graduate INT NOT NULL,
    id_option   INT NOT NULL,
    PRIMARY KEY (id_graduate, id_option),
    FOREIGN KEY (id_graduate) REFERENCES graduates(id_graduate) ON DELETE CASCADE,
    FOREIGN KEY (id_option)   REFERENCES preference_options(id_option) ON DELETE CASCADE
);

CREATE TABLE course_categories (
    id_course INT NOT NULL,
    id_option INT NOT NULL,
    PRIMARY KEY (id_course, id_option),
    FOREIGN KEY (id_course) REFERENCES courses(id_course)       ON DELETE CASCADE,
    FOREIGN KEY (id_option) REFERENCES preference_options(id_option) ON DELETE CASCADE
);

/* =========================================================
   5. ENCUESTAS Y RESPUESTAS
   ========================================================= */

CREATE TABLE survey_questions (
    id_question INT PRIMARY KEY AUTO_INCREMENT,
    text        VARCHAR(255) NOT NULL,
    category    VARCHAR(50)  NOT NULL                -- p.ej. 'satisfaccion', 'impacto'
);

CREATE TABLE survey_responses (
    id_response  INT PRIMARY KEY AUTO_INCREMENT,
    id_graduate  INT NOT NULL,
    id_course    INT NOT NULL,
    id_question  INT NOT NULL,
    answer_text  TEXT NOT NULL,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_graduate) REFERENCES graduates(id_graduate),
    FOREIGN KEY (id_course)   REFERENCES courses(id_course),
    FOREIGN KEY (id_question) REFERENCES survey_questions(id_question)
);

/* =========================================================
   6. HISTÓRICO DE CORREOS
   ========================================================= */

CREATE TABLE email_history (
    id_email         INT PRIMARY KEY AUTO_INCREMENT,
    id_admin         INT NOT NULL,     -- quién lo envió
    subject          VARCHAR(255) NOT NULL,
    message          TEXT NOT NULL,
    sent_to          ENUM('todos','inscritos','carrera') DEFAULT 'todos',
    carrera_filtrada VARCHAR(100),
    sent_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_admin) REFERENCES users(id_user)
);

CREATE TABLE email_recipients (
    id_email    INT NOT NULL,
    id_graduate INT NOT NULL,
    email       VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_email, id_graduate),
    FOREIGN KEY (id_email)    REFERENCES email_history(id_email)  ON DELETE CASCADE,
    FOREIGN KEY (id_graduate) REFERENCES graduates(id_graduate)  ON DELETE CASCADE
);