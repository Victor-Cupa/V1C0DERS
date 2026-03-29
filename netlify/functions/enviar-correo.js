exports.handler = async function(event, context) {
  // 1. Filtro de método
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // 2. Un solo parseo para todo
    const body = JSON.parse(event.body);
    const { user_name, user_email, subject, message, hp_field } = body;

    // 3. --- FILTRO HONEYPOT (Consolidado) ---
    // Si hp_field tiene algo, es un bot.
    if (hp_field && hp_field.length > 0) {
      console.warn('Spam detectado vía Honeypot');
      // Engañamos al bot con un 200, pero no enviamos nada
      return { 
        statusCode: 200, 
        body: JSON.stringify({ message: 'Procesado correctamente' }) 
      };
    }

    // 4. Validación de seguridad básica
    if (!user_email || !user_email.includes('@')) {
      return { statusCode: 400, body: 'Email inválido' };
    }

    // 5. Preparación del envío a EmailJS
    const payload = {
      service_id: 'service_l9gxfri',
      template_id: 'template_dai9i7d',
      user_id: '0gIISQNcKkZ7aJAGX',
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: {
        user_name,
        user_email,
        subject,
        // Sanitización para evitar inyección de HTML
        message: message ? message.replace(/<[^>]*>?/gm, '') : ''
      }
    };

    // 6. Petición oculta a la API
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return { statusCode: 200, body: 'Mensaje enviado' };
    } else {
      const errorData = await response.text();
      console.error('Error de EmailJS:', errorData);
      return { statusCode: 500, body: 'Error en el servicio de correo' };
    }

  } catch (error) {
    console.error('Error en la función:', error);
    return { statusCode: 500, body: 'Error interno del servidor' };
  }
};