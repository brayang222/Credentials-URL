const functions = require('firebase-functions');

exports.loginuser = functions.https.onRequest((req, resp) => {
  // Obtén la URL actual de la solicitud HTTP
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  // Busca el parámetro "ref" en la URL
  const refParam = new URL(url).searchParams.get('ref');
  const tecnicoParam = new URL(url).searchParams.get('|');
  const linkParam = new URL(url).searchParams.get('link');

  // Si no se encuentra los parámetros en la URL, devuelve un error
  if (!refParam) {
    return resp.status(400).json({ error: 'Parámetro "ref" no encontrado en la URL' });
  }
  if (!tecnicoParam) {
    return resp.status(400).json({ error: 'Parámetro "tecnico" no encontrado en la URL' });
  }

  // Divide la cadena resultante para obtener el correo electrónico y la contraseña
  const [email, password] = refParam.split('.');

  if (!email || !password) {
    return resp.status(400).json({ error: 'Formato de URL incorrecto' });
  }

  functions.logger.info('Correo electrónico:', email);
  functions.logger.info('Contraseña:', password);
  functions.logger.info('Técnico:', tecnicoParam);
  if (linkParam) {
    functions.logger.info('Ruta de referencia:', linkParam);
  }

  resp.status(200).json({ successful: true });
});
