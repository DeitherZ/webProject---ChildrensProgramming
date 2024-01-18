const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sql = require('./dbConfig')


passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            // Verifica las credenciales del usuario
            const result = await sql.query`
                SELECT * FROM Usuarios
                WHERE Usuario = ${username}`;

            const user = result.recordset[0];

            if (!user || user.Contraseña !== password) {
                console.error('Usuario o contraseña incorrectos');
                return done(null, false, { message: 'Usuario o contraseña incorrectos' });
            }

            return done(null, user);
        } catch (error) {
            console.log('Error al loguear el usuario: ' + error);
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.IdUsuario);
});

passport.deserializeUser(async (id, done) => {
    try {
        // Recupera al usuario de la base de datos por su ID
        const result = await sql.query`
            SELECT * FROM Usuarios
            WHERE IdUsuario = ${id}`;

        const user = result.recordset[0];
        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;