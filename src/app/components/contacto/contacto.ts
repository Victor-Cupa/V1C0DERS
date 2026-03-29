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

  // Estados de carga y respuesta
  enviando: boolean = false;
  mensajeEnviado: boolean = false;
  errorEnvio: boolean = false;

  public async enviarCorreo(e: Event) {
    e.preventDefault();
    this.enviando = true;
    this.mensajeEnviado = false;
    this.errorEnvio = false;

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Mapeo de datos (incluye el campo hp_field para seguridad)
    const data = {
      user_name: formData.get('user_name'),
      user_email: formData.get('user_email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      hp_field: formData.get('hp_field') // Trampa para bots
    };

    try {
      const response = await fetch('/.netlify/functions/enviar-correo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        this.mensajeEnviado = true;
        form.reset(); // Limpia los campos tras el éxito
      } else {
        this.errorEnvio = true;
      }
    } catch (error) {
      console.error('Error de red:', error);
      this.errorEnvio = true;
    } finally {
      this.enviando = false;
      
      // Auto-ocultar notificaciones tras 6 segundos
      setTimeout(() => {
        this.mensajeEnviado = false;
        this.errorEnvio = false;
      }, 6000);
    }
  }
}