const errorLanzado = require('../util/error');
const cuentaUsuarioService = require('../services/cuentaUsuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const colores = require('colors');

exports.login = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    if (usuario == undefined || contraseña == undefined) throw errorLanzado(400, 'Hay datos del formulario que no se han enviado');

    const cuentaUsuario = await cuentaUsuarioService.getUsuarioLogeado(usuario);
    const contraseñaCorrecta = bcrypt.compareSync(contraseña, cuentaUsuario.contraseña);
    if (!contraseñaCorrecta) throw errorLanzado(401, 'La contraseña introducida es incorrecta');

    const jwtToken = jwt.sign({ _id: cuentaUsuario._id, usuario: cuentaUsuario.usuario, autoridad: cuentaUsuario.autoridad }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });

    return res.status(200).send({ jwtToken });
  } catch (error) {
    if (error.status && error.message) {
      console.error(colores.red('[Error ' + error.status + ']'));
      console.error(colores.red(error.stack));
      return res.status(error.status).send({ error: error.message });
    } else {
      console.log(colores.red(error));
      return res.status(500).send({ error });
    }
  }
};
