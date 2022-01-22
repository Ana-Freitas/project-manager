-- CRIAÇÃO DAS TABELAS
CREATE TABLE sectors(
	`code` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `groups`(
	`code` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE users (
	`code` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
	`password` VARCHAR(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE permissions (
	`code` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	`description` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE users_permissions(
	user_code BIGINT(20) NOT NULL,
	permission_code BIGINT(20) NOT NULL,
	PRIMARY KEY (user_code, permission_code),
	FOREIGN KEY (user_code) REFERENCES users(code),
	FOREIGN KEY (permission_code) REFERENCES permissions(code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE employees (
	`code` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    salary DECIMAL(10,2),
    `group` BIGINT(20),
    sector BIGINT(20),
    `active` TINYINT DEFAULT 0,
    FOREIGN KEY (`group`) REFERENCES `groups`(`code`),
    FOREIGN KEY (sector) REFERENCES sectors(`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE projects(
	`code` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    start_date DATETIME DEFAULT NOW(),
    end_date DATETIME,
    sector BIGINT(20),
    `active` TINYINT DEFAULT 0,
    FOREIGN KEY (sector) REFERENCES sectors(`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE project_employee(
	`code` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    workload INTEGER,
    manager TINYINT,
    project BIGINT(20) NOT NULL,
    employee BIGINT(20) NOT NULL,
    start_participation DATETIME DEFAULT NOW(),
    end_participation DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- INSERÇÃO NAS TABELAS

-- SECTOR
INSERT INTO sectors VALUES(1, 'TI');
INSERT INTO sectors VALUES(2, 'Compra');
INSERT INTO sectors VALUES(3, 'Venda');
INSERT INTO sectors VALUES(4, 'Comunicação');

-- groups
INSERT INTO `groups` VALUES(1, 'Dev. Back-end');
INSERT INTO `groups` VALUES(2, 'Dev. Front-end');
INSERT INTO `groups` VALUES(3, 'Dev. Full-stack');
INSERT INTO `groups` VALUES(4, 'Dev. Mobile');
INSERT INTO `groups` VALUES(5, 'Administrativo');

-- employees
INSERT INTO employees (`name`,cpf,salary,`group`,sector,`active`) VALUES ("Adalberto Roxo",'58671365409',10621.55,4,1,1);
INSERT INTO employees (`name`,cpf,salary,`group`,sector,`active`) VALUES ("Roberto Selmi Dei",'87807791233',4850,3,1,1);
INSERT INTO employees (`name`,cpf,salary,`group`,sector,`active`) VALUES ("Geraldo do Carmo",'74681610704',7297,2,2,1);
INSERT INTO employees (`name`,cpf,salary,`group`,sector,`active`) VALUES ("Rafaela Amoroso Micelli",'26454915450',8000,1,1,1);
INSERT INTO employees (`name`,cpf,salary,`group`,sector,`active`) VALUES ("José Xavier Martinez",'43452858448',2500,5,4,0);

-- projects
INSERT INTO projects (`name`,`description`,start_date,end_date,sector,`active`) VALUES ("Disma","Aplicativo de geolocalização",'2020-02-01', '2023-02-01',1,1);
INSERT INTO projects (`name`,`description`,start_date,end_date,sector,`active`) VALUES ("Banho e Hidratação","Aplicação de higienização de pets",'2020-06-15', '2023-06-15',1,1);
INSERT INTO projects (`name`,`description`,start_date,end_date,sector,`active`) VALUES ("Ser","Aplicação de Vacinação de Animais",'2021-07-21', '2023-03-21',1,1);
INSERT INTO projects (`name`,`description`,start_date,end_date,sector,`active`) VALUES ("SoundCore","Aplicativo de playlist musicais",'2022-08-16', '2022-12-01',1,0);

-- project_employee
INSERT INTO project_employee (workload,manager,project,employee,start_participation,end_participation) VALUES (180,1,1,1,'2020-02-01','2023-02-01');
INSERT INTO project_employee (workload,manager,project,employee,start_participation,end_participation) VALUES (180,0,1,2,'2020-03-01','2023-02-01');
INSERT INTO project_employee (workload,manager,project,employee,start_participation,end_participation) VALUES (180,1,2,2,'2020-06-15', '2023-06-15');
INSERT INTO project_employee (workload,manager,project,employee,start_participation,end_participation) VALUES (180,1,3,3,'2021-07-21', '2023-03-21');
INSERT INTO project_employee (workload,manager,project,employee,start_participation,end_participation) VALUES (180,1,4,5,'2022-08-16', '2022-12-01');

-- USERS
INSERT INTO `users` VALUES(1, 'Admin', 'admin@ifsp.edu.br', '$2a$10$X607ZPhQ4EgGNaYKt3n4SONjIv9zc.VMWdEuhCuba7oLAL5IvcL5.'); 
INSERT INTO `users` VALUES(2, 'Ana Freitas', 'ana.ruas@ifsp.edu.br', '$2a$10$X607ZPhQ4EgGNaYKt3n4SONjIv9zc.VMWdEuhCuba7oLAL5IvcL5.'); 
INSERT INTO `users` VALUES(3, 'Vinícius N.', 'vinicius.np@ifsp.edu.br', '$2a$10$X607ZPhQ4EgGNaYKt3n4SONjIv9zc.VMWdEuhCuba7oLAL5IvcL5.'); 

-- PERMISSIONS
INSERT INTO permissions (`code`, `description`) VALUES (1, 'ROLE_SAVE_USERS');
INSERT INTO permissions (`code`, `description`) VALUES (2, 'ROLE_SEARCH_USERS');
INSERT INTO permissions (`code`, `description`) VALUES (3, 'ROLE_REMOVE_USERS');

INSERT INTO permissions (`code`, `description`) VALUES (4, 'ROLE_SAVE_EMPLOYEE');
INSERT INTO permissions (`code`, `description`) VALUES (5, 'ROLE_REMOVE_EMPLOYEE');
INSERT INTO permissions (`code`, `description`) VALUES (6, 'ROLE_SEARCH_EMPLOYEE');

INSERT INTO permissions (`code`, `description`) VALUES (7, 'ROLE_SAVE_PROJECT');
INSERT INTO permissions (`code`, `description`) VALUES (8, 'ROLE_REMOVE_PROJECT');
INSERT INTO permissions (`code`, `description`) VALUES (9, 'ROLE_SEARCH_PROJECT');

INSERT INTO permissions (`code`, `description`) VALUES (10, 'ROLE_SAVE_SECTOR');
INSERT INTO permissions (`code`, `description`) VALUES (11, 'ROLE_REMOVE_SECTOR');
INSERT INTO permissions (`code`, `description`) VALUES (12, 'ROLE_SEARCH_SECTOR');

INSERT INTO permissions (`code`, `description`) VALUES (13, 'ROLE_SAVE_GROUP');
INSERT INTO permissions (`code`, `description`) VALUES (14, 'ROLE_REMOVE_GROUP');
INSERT INTO permissions (`code`, `description`) VALUES (15, 'ROLE_SEARCH_GROUP');

INSERT INTO permissions (`code`, `description`) VALUES (16, 'ROLE_ADD_PERMISSION');
INSERT INTO permissions (`code`, `description`) VALUES (17, 'ROLE_REMOVE_PERMISSION');