exports.handler = async (event) => {
  // 1. Filtro de método HTTP
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // 2. Un solo parseo para todo el body
    const data = JSON.parse(event.body);
    const { user_name, user_email, subject, message, hp_field } = data;

    // 3. Filtro Honeypot (Seguridad Anti-Bot)
    if (hp_field && hp_field.length > 0) {
      console.warn('Spam detectado vía Honeypot');
      // Engañamos al bot con un 200, pero cortamos la ejecución aquí
      return { 
        statusCode: 200, 
        body: JSON.stringify({ message: 'Procesado correctamente' }) 
      };
    }

    // 4. Validación de Integridad de Datos
    // Evitamos correos sin @ o mensajes excesivamente largos que consuman recursos
    if (!user_email || !user_email.includes('@') || (message && message.length > 2000)) {
      return { statusCode: 422, body: "Invalid data" };
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
        // Sanitización estricta para evitar inyección de HTML en tu bandeja de entrada
        message: message ? message.replace(/<[^>]*>?/gm, '') : ''
      }
    };

    // 6. Petición a la API de EmailJS
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