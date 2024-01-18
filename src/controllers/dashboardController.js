// En controllers/dashboardController.js
const sql = require('../../config/dbConfig.js');

async function getNivelesYSubniveles() {
    try {
        const result = await sql.query`
            SELECT N.Nivel, SN.SubNivel, SN.IdSubNivel
            FROM Niveles N
            JOIN SubNiveles SN ON N.IdNivel = SN.IdNivel
        `;
        return result.recordset;
    } catch (error) {
        console.error('Error al obtener niveles y subniveles:', error);
        throw error;
    }
}

async function getCalificacion(req, res, IdSubNivel){
    try {
        const IdUsuario = req.session.passport.user;
        const result = await sql.query`
            -- Tu consulta para obtener la califacaon
            SELECT Calificacion
            FROM Calificaciones 
            WHERE IdUsuario=${IdUsuario} AND IdSubNivel=${IdSubNivel};
        `;
        var calificacion = 0;
        if(result.recordset[0] === undefined){
            return calificacion;
        } else{
            calificacion = result.recordset[0].Calificacion;
            return calificacion;
        }
    } catch (error) {
        console.error('Error al obtener niveles y subniveles:', error);
        throw error;
    }
}

function formatDataForDashboard(nivelesYSubniveles) {
    const data = {};

    nivelesYSubniveles.forEach((row) => {
        const nivel = row.Nivel;
        const subnivel = row.SubNivel;
        const subnivelId = row.IdSubNivel;

        if (!data[nivel]) {
            data[nivel] = [];
        }

        data[nivel].push({ subnivel, subnivelId });
    });

    return data;
}

async function generateHTMLForDashboard(req, res, formattedData) {
    let html = '';

    for (const nivel in formattedData) {
        html += `<div class="level-container">
                    <h2>${nivel}</h2>
                    <div class="sublevel-container">`;

        for (const { subnivel, subnivelId } of formattedData[nivel]) {
            var calificacion = await getCalificacion(req, res, subnivelId);
            html += `<div class="sublevel-tarjet" onclick="goQuestions('/questions/${subnivelId}/1')">
                        <p>${subnivel}</p>
                        <p>Calificacion:</p>
                        <p class="calificacion">${calificacion}/5</p>
                        <div class="progress-bar"></div>
                    </div>`;
        }

        html += `   </div>
                </div>`;
    }

    return html;
}

module.exports = {
    getNivelesYSubniveles,
    formatDataForDashboard,
    generateHTMLForDashboard,
};