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

-- GROUPS
INSERT INTO `groups` VALUES(1, 'Dev. Back-end');
INSERT INTO `groups` VALUES(2, 'Dev. Front-end');

-- USERS
INSERT INTO `users` VALUES(1, 'Admin', 'admin@ifsp.edu.br', '123456'); 
INSERT INTO `users` VALUES(2, 'Ana Freitas', 'ana.ruas@ifsp.edu.br', '123456'); 
INSERT INTO `users` VALUES(3, 'Vinícius N.', 'vinicius.np@ifsp.edu.br', '123456'); 

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
