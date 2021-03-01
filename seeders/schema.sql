DROP DATABASE IF EXISTS users_db;
CREATE DATABASE users_db;
USE users_db;

CREATE TABLE users (
	id Int( 11 ) AUTO_INCREMENT NOT NULL,
	email VARCHAR( 255) NOT NULL,
	password VARCHAR( 255) NOT NULL,
	type VARCHAR( 255) NOT NULL,
	/* Set ID as primary key */
	PRIMARY KEY ( id )
);

CREATE TABLE companies (
	id Int( 11 ) AUTO_INCREMENT NOT NULL,
	company_name VARCHAR( 255) NOT NULL,
	ABN INT ( 11) NOT NULL,
	/* Set ID as primary key */
	PRIMARY KEY ( id )
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE labourers (
	id Int( 11 ) AUTO_INCREMENT NOT NULL,
	first_name VARCHAR( 255) NOT NULL,
	last_name VARCHAR( 255) NOT NULL,
	DOB INT ( 11) NOT NULL,
	drivers_license BOOLEAN NOT NULL,
	skills VARCHAR( 255) NOT NULL,
	/* Set ID as primary key */
	PRIMARY KEY ( id )
    FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE jobs (
	id Int( 11 ) AUTO_INCREMENT NOT NULL,
	job_address VARCHAR( 255) NOT NULL,
	site_manager VARCHAR( 255) NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	number_of_labourers Int( 11 ) AUTO_INCREMENT NOT NULL,
	/* Set ID as primary key */
	PRIMARY KEY ( id )
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE applications (
	id Int( 11 ) AUTO_INCREMENT NOT NULL,
	FOREIGN KEY (job_id) REFERENCES jobs(id)
	FOREIGN KEY (user_id) REFERENCES users(id)
	/* Set ID as primary key */
	PRIMARY KEY ( id )
);
