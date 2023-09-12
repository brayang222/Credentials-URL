const functions = require('firebase-functions');

exports.loginuser = functions.https.onRequest((req, resp) => {
  // Obtén la URL actual de la solicitud HTTP
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  // Busca el parámetro "ref" en la URL
  const refParam = new URL(url).searchParams.get('ref');

  if (!refParam) {
    // Si no se encuentra el parámetro "ref" en la URL, devuelve un error
    return resp.status(400).json({ error: 'Parámetro "ref" no encontrado en la URL' });
  }

  // Divide la cadena resultante para obtener el correo electrónico y la contraseña
  const [email, password] = refParam.split('.');

  if (!email || !password) {
    // Si no se pueden obtener el correo electrónico o la contraseña, devuelve un error
    return resp.status(400).json({ error: 'Formato de URL incorrecto' });
  }

  functions.logger.info('Correo electrónico:', email);
  functions.logger.info('Contraseña:', password);

  resp.status(200).json({ successful: true });
});
