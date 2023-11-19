/**
 * Rutas de autenticación
 * /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/',
    [
        // middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);

router.post(
    '/new',
    [
        // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;