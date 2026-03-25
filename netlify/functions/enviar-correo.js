exports.handler = async function(event, context) {
  // 1. Filtro de seguridad: Solo aceptamos peticiones POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // 2. Extraemos los datos que nos mandará tu formulario en Angular
    const { user_name, user_email, subject, message } = JSON.parse(event.body);

    // 3. Armamos el paquete de datos privado para EmailJS
    const payload = {
      service_id: 'service_l9gxfri',
      template_id: 'template_dai9i7d',
      user_id: '0gIISQNcKkZ7aJAGX', // Tu llave pública queda oculta en este servidor
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: {
        user_name: user_name,
        user_email: user_email,
        subject: subject,
        message: message
      }
    };

    // 4. Hacemos la llamada HTTP oculta a la API de EmailJS
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return { statusCode: 200, body: JSON.stringify({ message: 'Éxito' }) };
    } else {
      return { statusCode: response.status, body: JSON.stringify({ error: 'Error en EmailJS' }) };
    }

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Error del servidor' }) };
  }
};