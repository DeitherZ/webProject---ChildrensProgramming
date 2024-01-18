USE ChildrensProgramming;

select * from niveles;

INSERT INTO Niveles (Nivel) VALUES 
('Nivel 1: Introducción a la Programación'),
('Nivel 2: Avanzando en la Programación');

-- Inserciones para SubNiveles
INSERT INTO SubNiveles (IdNivel, SubNivel) VALUES 
-- Nivel 1
(1, 'Subnivel 1: Conceptos Básicos'),
(1, 'Subnivel 2: Estructuras de Control'),
(1, 'Subnivel 3: Funciones Básicas'),
(1, 'Subnivel 4: Variables y Tipos de Datos'),
(1, 'Subnivel 5: Resolucián de Problemas');

-- Inserciones para Preguntas (Subnivel 1 - Nivel 1)
INSERT INTO Preguntas (IdSubNivel, Pregunta) VALUES
-- Pregunta 1
(1, '¿Qué es la programación?'),
-- Pregunta 2
(1, '¿Qué es un algoritmo?'),
-- Pregunta 3
(1, 'Verdadero o falso: En programación, una variable puede cambiar su valor durante la ejecución del programa.'),
-- Pregunta 4
(1, 'Completa la siguiente instrucción: ______(¡Hola, Mundo!);'),
-- Pregunta 5
(1, '¿Cuál de las siguientes opciones representa un bucle en programación?');

-- Inserciones para Respuestas (Subnivel 1 - Nivel 1)
INSERT INTO Respuestas (IdPregunta, Respuesta, CoI) VALUES
-- Pregunta 1
(1, 'Cocinar', 'F'),
(1, 'Decidir qué hacer', 'F'),
(1, 'Escribir instrucciones para la computadora', 'T'),
(1, 'Cantar canciones', 'F'),
-- Pregunta 2
(2, 'Un tipo de animal', 'F'),
(2, 'Una lista de pasos para hacer algo', 'T'),
(2, 'Un vehículo espacial', 'F'),
(2, 'Una canción popular', 'F'),
-- Pregunta 3
(3, 'Verdadero', 'T'),
(3, 'Falso', 'F'),
-- Pregunta 4
(4, 'print', 'T'),
(4, 'enseñar', 'F'),
(4, 'mostrar', 'F'),
(4, 'holamundo', 'F'),
-- Pregunta 5
(5, 'if-else', 'F'),
(5, 'switch', 'F'),
(5, 'for', 'T'),
(5, 'try-catch', 'F');

-- Inserciones para Preguntas (Subnivel 2 - Nivel 1)
INSERT INTO Preguntas (IdSubNivel, Pregunta) VALUES
-- Pregunta 1
(2, '¿Cómo se llama la estructura de control que repite una acción mientras se cumple una condición?'),
-- Pregunta 2
(2, '¿Qué es un condicional en programación?'),
-- Pregunta 3
(2, 'Verdadero o falso: Un bucle puede ejecutarse indefinidamente si no se establece una condición de salida.'),
-- Pregunta 4
(2, 'Completa la instrucción: Si la condición es cierta, ejecuta _____.'),
-- Pregunta 5
(2, '¿Cuál es el propósito de un bucle en programación?');

-- Inserciones para Respuestas (Subnivel 2 - Nivel 1)
INSERT INTO Respuestas (IdPregunta, Respuesta, CoI) VALUES
-- Pregunta 1
(6, 'Bucle', 'T'),
(6, 'Secuencia', 'F'),
(6, 'Alternativa', 'F'),
(6, 'Iteración', 'F'),
-- Pregunta 2
(7, 'Repetición de código', 'F'),
(7, 'Función en programación', 'F'),
(7, 'Error común en el código', 'F'),
(7, 'Decisión basada en una condición', 'T'),
-- Pregunta 3
(8, 'Verdadero', 'T'),
(8, 'Falso', 'F'),
-- Pregunta 4
(9, 'Condición', 'F'),
(9, 'Cuerpo del código verdadero', 'T'),
(9, 'Instrucción de salida del bucle', 'F'),
-- Pregunta 5
(10, 'Hacer que el código sea más lento', 'F'),
(10, 'Repetir una acción múltiples veces', 'T'),
(10, 'Detener la ejecución del programa', 'F'),
(10, 'Realizar cálculos matemáticos', 'F');

-- Inserciones para Preguntas (Subnivel 3 - Nivel 1)
INSERT INTO Preguntas (IdSubNivel, Pregunta) VALUES
-- Pregunta 1
(3, '¿Qué es una función en programación?'),
-- Pregunta 2
(3, '¿Qué  es la "llamada de función" en programación?'),
-- Pregunta 3
(3, '¿Cómo se llama la acción de utilizar una función en programación?'),
-- Pregunta 4
(3, 'Verdadero o falso: Una función nunca podrá devolver un valor.'),
-- Pregunta 5
(3, '¿Por qué es útil utilizar funciones en programación?');

-- Inserciones para Respuestas (Subnivel 3 - Nivel 1)
INSERT INTO Respuestas (IdPregunta, Respuesta, CoI) VALUES
-- Pregunta 1
(11, 'Un bloque de código reutilizable', 'T'),
(11, 'Una variable en programación', 'F'),
(11, 'Una condición lógica', 'F'),
(11, 'Una estructura de control', 'F'),
-- Pregunta 2
(12, 'nombre_funcion', 'T'),
(12, 'definir_funcion', 'F'),
(12, 'crear_funcion', 'F'),
(12, 'nueva_funcion', 'F'),
-- Pregunta 3
(13, 'Declaración de una función', 'F'),
(13, 'Invocación de una función', 'T'),
(13, 'Ejecución de bucle', 'F'),
(13, 'Declaración de variable', 'F'),
-- Pregunta 4
(14, 'Verdadero', 'F'),
(14, 'Falso', 'T'),
-- Pregunta 5
(15, 'Para hacer el código más largo', 'F'),
(15, 'Para complicar la programación', 'F'),
(15, 'Para reutilizar código', 'T'),
(15, 'Para reducir la legibilidad del código', 'F');

-- Inserciones para Preguntas (Subnivel 4 - Nivel 1)
INSERT INTO Preguntas (IdSubNivel, Pregunta) VALUES
-- Pregunta 1
(4, '¿Qué es una variable en programación?'),
-- Pregunta 2
(4, '¿Cómo se declara una variable en la mayoría de los lenguajes de programación?'),
-- Pregunta 3
(4, 'Verdadero o falso: Una variable puede contener diferentes tipos de datos.'),
-- Pregunta 4
(4, 'Completa la siguiente afirmación: En programación, una variable es un contenedor para almacenar _________.'),
-- Pregunta 5
(4, '¿Cuál es la importancia de comprender los tipos de datos en programación?');

-- Inserciones para Respuestas (Subnivel 4 - Nivel 1)
INSERT INTO Respuestas (IdPregunta, Respuesta, CoI) VALUES
-- Pregunta 1
(16, 'Un espacio para almacenar información', 'T'),
(16, 'Un bucle en programación', 'F'),
(16, 'Una función matemática', 'F'),
(16, 'Una estructura de control', 'F'),
-- Pregunta 2
(17, 'Var nombre_variable', 'F'),
(17, 'int nombre_variable;', 'T'),
(17, 'variable = 10;', 'F'),
(17, 'Crear variable nombre_variable', 'F'),
-- Pregunta 3
(18, 'Verdadero', 'T'),
(18, 'Falso', 'F'),
-- Pregunta 4
(19, 'Lista de comprar', 'F'),
(19, 'Instrucciones', 'F'),
(19, 'Información', 'T'),
(19, 'Funciones', 'F'),
-- Pregunta 5
(20, 'Permite almacenar diferentes tipos de datos', 'T'),
(20, 'No es importante en programación', 'F'),
(20, 'Simplifica el código', 'F'),
(20, 'Aumenta la velocidad de ejecución', 'F');

-- Inserciones para Preguntas (Subnivel 5 - Nivel 1)
INSERT INTO Preguntas (IdSubNivel, Pregunta) VALUES
-- Pregunta 1
(5, '¿Cuál es el propósito de utilizar estructuras de control de repetición en programación?'),
-- Pregunta 2
(5, 'Completa la siguiente instrucci+on: "Escribe un _____ que imprima los nómeros del 1 al 10."'),
-- Pregunta 3
(5, 'Verdadero o falso: Un bucle "while" no se ejecuta al menos que la condición sea verdadera.'),
-- Pregunta 4
(5, '¿Por qué es importante evitar bucles infinitos en programación?'),
-- Pregunta 5
(5, 'Completa la siguiente afirmación: La instrucción "break" se utiliza para ______ un bucle.');

-- Inserciones para Respuestas (Subnivel 5 - Nivel 1)
INSERT INTO Respuestas (IdPregunta, Respuesta, CoI) VALUES
-- Pregunta 1
(21, 'Hacer que el código sea más lento', 'F'),
(21, 'Controlar la repetición de ciertas acciones', 'T'),
(21, 'Aumentar la complejidad del código', 'F'),
(21, 'Eliminar estructuras de control', 'F'),
-- Pregunta 2
(22, 'If', 'F'),
(22, 'Return', 'F'),
(22, 'Bucle', 'T'),
(22, 'Variable', 'F'),
-- Pregunta 3
(23, 'Verdadero', 'F'),
(23, 'Falso', 'T'),
-- Pregunta 4
(24, 'Pueden hacer que un programa se bloquee', 'T'),
(24, 'Mejoran la velocidad del programa', 'F'),
(24, 'Simplifican la lógica del programa', 'F'),
(24, 'No tienen impacto en la ejecución', 'F'),
-- Pregunta 5
(25, 'Salir de', 'T'),
(25, 'Continuar con', 'F'),
(25, 'Iniciar de nuevo', 'F'),
(25, 'Modificar', 'F');