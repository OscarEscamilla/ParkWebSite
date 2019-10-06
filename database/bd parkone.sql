create database parknone;
use parknone


--tabla creada
create table persons(
    id          int          not null AUTO_INCREMENT,
    nombre      varchar(50)  not null,
    ape_pat     varchar(50)  not null,
    ape_mat     varchar(50)  not null,
    telefono    varchar(15)  null,
    primary key(id));

--tabla creada
create table users(
    id          int          not null AUTO_INCREMENT,
    correo      varchar(60)  not null,
    password    varchar(60)  not null,
    image       varchar(255)     null,
    rol         binary       not null,
    id_person   int          null,
    PRIMARY KEY(id),
    CONSTRAINT FOREIGN KEY  (id_person) 
    REFERENCES persons (id));


--tabla creada
create table parks(
    id             int           not null AUTO_INCREMENT,
    nombre_park    varchar(100)  not null,
    calle          varchar(70)   not null,
    colonia        varchar(70)   not null,
    numero_ext     int           not null,
    stock          int           not null,
    dia_ini        varchar(20)   not null,
    dia_fin        varchar(20)   not null,
    hora_apertura  time          not null,
    hora_cierre    time          not null,
    descripcion    text          null,
    url_ubicacion  text          null,
    id_person      int           null,
    PRIMARY KEY(id),
    CONSTRAINT FOREIGN KEY  (id_person) 
    REFERENCES persons (id));

--tabla creada
create table puntuaciones(
    id            int           not null AUTO_INCREMENT,
    comment       text          not null,
    calificacion  int           not null,
    id_person     int           null,
    id_park       int           null,
PRIMARY KEY(id),
CONSTRAINT FOREIGN KEY(id_person) 
REFERENCES persons (id));


--tabla creada
create table cars(
    id              int             not null AUTO_INCREMENT,
    matricula       varchar(20)     not null,
    marca           varchar(30)     not null,
    color           varchar(15)     not null,
    descripcion     text            null,
    id_person       int             not null,
    PRIMARY KEY(id)
 );

--tabla creada
create table inputs(
    id             int           not null AUTO_INCREMENT,
    entrada        timestamp     not null DEFAULT CURRENT_TIMESTAMP,
    salida         timestamp     null,
    estado         int           not null DEFAULT 1,
    tarifa_hr      double        not null,
    total          double        null,
    descripcion    text          null,
    id_park        int           null,
    id_car         int           null,
    PRIMARY KEY(id),
    CONSTRAINT  FOREIGN KEY (id_park)
        REFERENCES parks(id),
    CONSTRAINT  FOREIGN KEY (id_car)
        REFERENCES cars(id));


--tabla creada
create table tarifas(
    id              int             not null AUTO_INCREMENT,
    tipo_car        varchar(50)     not null,
    descripcion     text            null,
    tarifa          double          not null,
    id_park         int             null,
    PRIMARY KEY(id),
    CONSTRAINT FOREIGN KEY (id_park) REFERENCES parks(id) ON UPDATE CASCADE
    );

--insertado
INSERT INTO persons (nombre, ape_pat, ape_mat, telefono) VALUES 
('Daniela','Rubiales','Márquez','7752789292'),
('Esteban','Islas','Santos','7753457890'),
('Oscar','Escamilla','Luqueño','7753434890');

--insertado  ROL  0-estacionamiento  1-usuario
INSERT INTO users (correo,password,image,rol,id_person) VALUES
('danielarubiales@gmail.com','dani123','image',0,1),
('ocarescamilla@gmail.com','oscar123','image',1,3),
('estebanislas@gmail.com','esteban123','image',0,2);

 --nombre_park, calle, colonia, numero_ext, stock, dia_ini, dia_fin, hora_apertura, hora_cierre, descripcion, url_ubicacion, id_person
 -- select parks.nombre_park, parks.id, persons.nombre, persons.id from parks, persons  where parks.id_person = persons.id;
--insertado
INSERT INTO parks(nombre_park, calle, colonia, numero_ext, stock, dia_ini, dia_fin, hora_apertura, hora_cierre, id_person) VALUES
('Hidalgo','Miguel Hidalgo','San Francisco',15,25,'Lunes','Domingo','8:00','14:00',1),
('La fuente','Benito Juarez','Centro',25,100,'Lunes','Domingo','7:30','15:00',2);

--comment, calificacion, id_person id_park 
--insertado
INSERT INTO puntuaciones(comment,calificacion,id_person, id_park) VALUES
('Excelente servicio y muy buen trato',5,3,1),
('Porfavor si pudiera abrir mas temprano',3,3,2);
-- select 

--insertado
INSERT INTO cars(matricula,marca,color,descripcion,id_person) VALUES
('MHS152S','Nissan','Rojo','Camioneta familiar',3),
('TEM646L','Frontier','Gris','Camoneta que ya tiene un golpe en la aprte inferior delantera',3);



-- id, entrada, salida, estado, tarifa_hr, total, id_park, id_car        
-- insertado 
INSERT INTO inputs(tarifa_hr,id_park,id_car) VALUES
(10.50,1,1),
(15.20,2,2);


-- insertado 
INSERT INTO tarifas(tipo_car,descripcion,tarifa,id_park) VALUES
('Motos','Ejemplos de motos italikas,Naked Buell,Supermoto BETA,Doble Propósito KTM 1290,Urbanas Yamaha FZ-16.',5,1),
('Automoviles','Ejemplos de automoviles Jetta,Platina,Fiesta.',10,1),
('camioneta','Ejemplos de camionetas pickups, vehículos todoterreno, furgonetas, monovolúmenes, y familiares',15,2);
