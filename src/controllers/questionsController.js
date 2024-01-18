// En controllers/questionsController.js
const sql = require('../../config/dbConfig.js');

async function getPreguntasPorSubnivel(subNivelId) {
    try {
        const result = await sql.query`
            SELECT P.Pregunta, P.IdPregunta, R.IdRespuesta, R.Respuesta, R.CoI
            FROM Preguntas P
            JOIN Respuestas R ON P.IdPregunta = R.IdPregunta
            WHERE P.IdSubNivel = ${subNivelId};
        `;

        // Organizamos las preguntas y respuestas en un formato adecuado
        const preguntas = [];
        for (const row of result.recordset) {
            // Verificamos si ya hemos creado la pregunta actual
            const preguntaExistente = preguntas.find(p => p.IdPregunta === row.IdPregunta);

            if (preguntaExistente) {
                // Si la pregunta ya existe, simplemente agregamos la respuesta
                preguntaExistente.respuestas.push({ IdRespuesta: row.IdRespuesta, respuesta: row.Respuesta, CoI: row.CoI });
            } else {
                // Si la pregunta no existe, la creamos junto con su respuesta
                const nuevaPregunta = {
                    IdPregunta: row.IdPregunta,
                    pregunta: row.Pregunta,
                    respuestas: [{ IdRespuesta: row.IdRespuesta, respuesta: row.Respuesta, CoI: row.CoI }]
                };
                preguntas.push(nuevaPregunta);
            }
        }
        return preguntas;
    } catch (error) {
        console.error('Error al obtener preguntas por subnivel:', error);
        throw error;
    }
}

async function generarHTMLPregunta(req, res, subnivelId, numeroPregunta) {
    try {
        // Obtener las preguntas y respuestas por subnivel
        const preguntas = await getPreguntasPorSubnivel(subnivelId);

        // Obtener la pregunta actual basada en el número proporcionado
        const preguntaActual = preguntas[numeroPregunta - 1];

        // Verificar si la pregunta actual existe
        if (preguntaActual) {
            // Generar el HTML con la pregunta y respuestas
            const html = `       
                <div class="subcontainer-top">
                    <button type="submit" id="button-back" class="button-back">Salir</button>
                    <div class="progress">
                        <h2 class="valor-progreso" data-subnivel-id=${subnivelId} data-pregunta-number=${numeroPregunta}>Pregunta #${numeroPregunta}</h2>
                        <div class="progress-bar"></div>
                    </div>
                </div>
                <div class="subcontainer-mid">
                    <div class="pregunta">
                        <p>${preguntaActual.pregunta}</p>
                    </div>
                    </div>
                    <div class="subcontainer-bot">
                        <button type="submit" class="skip">Saltar</button>
                        <div class="answers-container">
                            ${preguntaActual.respuestas.map(respuesta => `
                                <div class="answer" data-answer-id=${respuesta.IdRespuesta}>
                                    <p>${respuesta.respuesta}</p>
                                </div>
                            `).join('')}
                        </div>
                        <button type="submit" id="next" class="next">Siguiente</button>
                    </div>
                </div>
            `;
            return html;
        } else {
            const userId = req.session.passport.user;
            const correctAnswersCount = req.session.correctAnswersCount;
            await actualizarCalificacionUsuario(subnivelId, userId, correctAnswersCount);
            const htmlfinaliza = `
                <div class="subcontainer-top">
                    <button type="submit" id="button-back" class="button-back" style="display: none">Salir</button>
                    <div class="progress">
                        <h2 class="valor-progreso" data-subnivel-id=${subnivelId} data-pregunta-number=${numeroPregunta}>Pregunta #5</h2>
                        <div class="progress-bar"></div>
                    </div>
                </div>
                <div class="subcontainer-mid">
                    <div class="pregunta">
                        <p>¡¡Felicidades!!<br>Haz completado todas las preguntas de este SubNivel :3</p>
                    </div>
                    </div>
                    <div class="subcontainer-bot" style="flex-direction: colum; justify-content: center">
                        <button type="submit" class="skip" style="display: none">Saltar</button>
                        <div class="answers-container">
                            <button type="submit" id="continue" class="continue">Continuar</button>
                        </div>
                        <button type="submit" id="next" class="next" style="display: none">Siguiente</button>
                    </div>
                </div>
                `;
            return htmlfinaliza;
        }
    } catch (error) {
        console.error('Error al generar el HTML de la pregunta:', error);
        throw error;
    }
}

async function validateAnswer(req, res) {
    const answerId = req.params.answerId;
    let correctAnswersCount = req.session.correctAnswersCount || 0;
    try {
        // Realiza una consulta para obtener la respuesta correcta desde la base de datos
        const correctAnswer = await sql.query`
            SELECT CoI
            FROM Respuestas
            WHERE IdRespuesta = ${answerId} AND CoI = 'T';
        `;
        // Compara la respuesta seleccionada con la respuesta correcta
        if (correctAnswer.recordset[0].CoI === 'T') {
            correctAnswersCount++;
            req.session.correctAnswersCount = correctAnswersCount;
            res.status(200).json({ result: 'correcto' });
        } else {
            res.status(200).json({ result: 'incorrecto' });
        }
    } catch (error) {
        console.error('Error al validar la respuesta:', error);
        res.status(500).json({ error: 'Error al validar la respuesta' });
    }
}

async function actualizarCalificacionUsuario(subnivelId, userId, correctAnswersCount) {
    try {
        // Consultar si el usuario ya tiene una calificación para ese subnivel
        const existingCalificacion = await sql.query`
            SELECT IdCalificacion
            FROM Calificaciones
            WHERE IdUsuario = ${userId} AND IdSubNivel = ${subnivelId};
        `;

        if (existingCalificacion.recordset.length > 0) {
            // Si ya existe una calificación, actualizarla
            const calificacionId = existingCalificacion.recordset[0].IdCalificacion;
            await sql.query`
                UPDATE Calificaciones
                SET Calificacion = ${correctAnswersCount}
                WHERE IdCalificacion = ${calificacionId};
            `;
        } else {
            // Si no existe una calificación, insertar una nueva
            await sql.query`
                INSERT INTO Calificaciones (IdUsuario, IdSubNivel, Calificacion)
                VALUES (${userId}, ${subnivelId}, ${correctAnswersCount});
            `;
        }
    } catch (error) {
        console.error('Error al actualizar/insertar la calificación del usuario:', error);
        throw error;
    }
}

module.exports = {
    getPreguntasPorSubnivel,
    generarHTMLPregunta,
    validateAnswer
};