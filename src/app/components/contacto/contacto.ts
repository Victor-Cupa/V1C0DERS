import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css']
})
export class Contacto {
  email: string = 'victor.cupa587@gmail.com'; 

  // Variables de estado
  enviando: boolean = false;
  mensajeEnviado: boolean = false;

  public async enviarCorreo(e: Event) {
    e.preventDefault(); 
    this.enviando = true;

    // 1. Capturamos el formulario de tu HTML
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // 2. Lo convertimos en un objeto JSON limpio
    const data = {
      user_name: formData.get('user_name'),
      user_email: formData.get('user_email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      // 3. ¡LA MAGIA SERVERLESS! Llamamos a tu propia API en lugar de a EmailJS
      const response = await fetch('/.netlify/functions/enviar-correo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        this.enviando = false;
        this.mensajeEnviado = true;
        form.reset();
        setTimeout(() => this.mensajeEnviado = false, 5000);
      } else {
        throw new Error('Error en el servidor');
      }
    } catch (error) {
      console.error('Error:', error);
      this.enviando = false;
      alert('Hubo un error al enviar el mensaje. Intenta de nuevo.');
    }
  }
}