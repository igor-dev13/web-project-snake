CREATE DATABASE Snake;

SET NAMES utf8;

CREATE TABLE options
(
    option_id SERIAL,
    option_name VARCHAR(255) DEFAULT '',
    status TINYINT(3),
    PRIMARY KEY (option_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO options (option_name, status)
VALUES
	("hide_bonus", "3"),
	("level_change", "1"),
	("speed_bonus", "1");

CREATE TABLE records (
  user_id SERIAL,
  nic_name varchar(255) DEFAULT '',
  score bigint(20) NOT NULL,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO records (user_id, nic_name, score) VALUES
(1,	'sam',	20),
(2,	'trinity',	30),
(3,	'gregg',	11),
(4,	'alex',	1),
(49,	'Igor',	3);
