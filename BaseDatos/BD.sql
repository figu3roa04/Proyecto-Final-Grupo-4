create database Ferreteria;

use Ferreteria;

create table personas(
id_Persona int not null AUTO_INCREMENT,
nombre varchar(45) not null,
apellido Varchar(45) not null,
telefono varchar(45),
estado_Persona tinyint(1),
imagen varchar(250),
primary key (id_Persona)
);

create table usuarios(
id_Usuario int not null AUTO_INCREMENT,
Usuario_persona_id int not null,
login varchar(45) not null,
correo varchar(250) not null,
contrasena varchar(250) not null,
estado enum('Activo', 'Inactivo', 'Bloqueado'),
tipo enum('CL','EM'),
primary key (id_Usuario),
foreign key(Usuario_persona_id) references personas(id_Persona)
on delete restrict
on update restrict
);

create table sesiones(
id_Sesiones int not null AUTO_INCREMENT,
Estado enum('Fallido', 'Correcto'),
fechahora datetime,
Sesiones_usuario_id int not null,
primary key (id_Sesiones),
foreign key(Sesiones_usuario_id) references usuarios(id_Usuario)
on delete restrict
on update restrict
);

create table tipos(
id_Tipos int not null AUTO_INCREMENT,
nombre varchar(45) not null,
activo tinyint(1),
imagen varchar(250),
primary key (id_Tipos)
);

create table productos(
id_Producto int not null AUTO_INCREMENT,
codigobarras varchar(45),
codigocatalogo varchar(45),
nombre_Producto varchar(45) not null,
descripcion_Producto varchar(45),
impuesto_Producto double,
precio_Producto double,
activo tinyint(1),
id_tipo_Producto int not null,
imagen_Producto varchar(250),
primary key (id_Producto),
foreign key(id_tipo_Producto) references tipos(id_Tipos)
on delete restrict
on update restrict
);