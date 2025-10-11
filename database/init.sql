CREATE DATABASE IF NOT EXISTS usof_db_polina;
CREATE USER IF NOT EXISTS 'ptovstonoh'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON usof_db.* TO 'ptovstonoh'@'localhost';