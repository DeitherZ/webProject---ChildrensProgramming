DROP DATABASE IF EXISTS ChildrensProgramming;

CREATE DATABASE ChildrensProgramming;

USE ChildrensProgramming;

CREATE TABLE Usuarios(
	IdUsuario INT IDENTITY PRIMARY KEY,
	Usuario VARCHAR(20) NOT NULL UNIQUE,
	Contraseña VARCHAR(20) NOT NULL
);

CREATE TABLE Niveles(
	IdNivel INT IDENTITY PRIMARY KEY,
	Nivel VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE SubNiveles(
	IdSubNivel INT IDENTITY PRIMARY KEY,
	IdNivel INT NOT NULL,
	SubNivel VARCHAR(50) NOT NULL,
	FOREIGN KEY(IdNivel) REFERENCES Niveles(IdNivel)
);

CREATE TABLE Preguntas(
	IdPregunta INT IDENTITY PRIMARY KEY,
	IdSubNivel INT NOT NULL,
	Pregunta VARCHAR(250) NOT NULL,
	FOREIGN KEY(IdSubNivel) REFERENCES SubNiveles(IdSubNivel)
);

CREATE TABLE Respuestas(
	IdRespuesta INT IDENTITY PRIMARY KEY,
	IdPregunta INT NOT NULL,
	Respuesta VARCHAR(50) NOT NULL,
	CoI CHAR(1) NOT NULL CHECK(CoI IN ('T','F')),
	FOREIGN KEY(IdPregunta) REFERENCES Preguntas(IdPregunta)
);

CREATE TABLE Calificaciones(
	IdCalificacion INT IDENTITY PRIMARY KEY,
	IdUsuario INT NOT NULL,
	IdSubNivel INT NOT NULL,
	Calificacion INT NOT NULL,
	FOREIGN KEY(IdUsuario) REFERENCES Usuarios(IdUsuario),
	FOREIGN KEY(IdSubNivel) REFERENCES SubNiveles(IdSubNivel)
);