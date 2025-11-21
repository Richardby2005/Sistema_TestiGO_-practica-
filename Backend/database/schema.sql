create database testiGO;
use testigo;
create table users (
	user_id int unsigned unique auto_increment primary key,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    dni varchar(15) not null unique,
    email varchar(100) not null,
    phone varchar(100) not null,
    password varchar(255) not null,
    role enum('civil','admin','autoridad') default 'civil',
    
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    is_active tinyint(1) default 1
);

create table institutions (
	institution_id int unsigned unique auto_increment primary key,
    name varchar(100) not null,
    email varchar(100) not null,
    logo_url text,
    
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    is_active tinyint(1) default 1
);

create table reports (
	report_id integer unsigned unique auto_increment primary key,
    title varchar(100) not null,
    description text,
    category enum('tecnico','administrativo','otro') default 'otro',
    district varchar(100) not null,
    address varchar(150) not null,
    -- evidence_url text,
    states enum('pendiente','en_proceso','resuelto', 'rechazado') default 'pendiente',
    
    user_id integer unsigned,
    institution_id integer unsigned,
    
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    is_active tinyint(1) default 1,
    
    constraint report_user
    foreign key (user_id) references users(user_id)
    on delete set null,
    
    constraint report_institucion
    foreign key (institution_id) references institutions(institution_id)
    on delete set null
    
);

create table evidences(
	evidence_id integer unsigned unique auto_increment primary key,
    report_id integer unsigned,
    url text,
    type enum('imagen','video','audio','otro') default 'otro',
    created_at timestamp default current_timestamp,
    
    constraint evidence_report 
    foreign key (report_id) references reports(report_id)
);

