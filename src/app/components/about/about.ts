import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements AfterViewInit {
  
  // Regla de Arquitectura: Usamos ViewChild en lugar de document.querySelector
  @ViewChild('textoDictado', { static: false }) textoDictado!: ElementRef;
  isTyping: boolean = false; // Para controlar la animación de las ondas de audio
  ngAfterViewInit(): void {
    // Configuramos las opciones de la "IA"
const options = {
  strings: [
    "Soy un profesional de la tecnología radicado en Colombia, apasionado por construir arquitecturas de software robustas y experiencias web dinámicas. Mi enfoque combina las mejores prácticas de la industria con un diseño limpio y escalable.",
    // Puedes añadir más frases aquí, separadas por coma, y las escribirá en secuencia
  ],
typeSpeed: 35,       
  backSpeed: 0,        // Velocidad 0 = borrado instantáneo completo
  backDelay: 2500,     
  startDelay: 800,     
  smartBackspace: false, // Fuerza a que borre toda la cadena de una vez
  // EL FIX CRÍTICO PARA REPETIR:
  loop:  false,      // ¡ACTÍVALO! Esto hará que la animación nunca se detenga
  fadeOut: true,   // Opcional: Para un efecto de desaparición suave entre frases
  fadeOutDelay: 100, // Opcional: Tiempo para el fade out antes de borrar
  
  showCursor: true,
  cursorChar: '|',
  
  // Opcional: Para sincronizar las ondas de audio
  onTypingStarted: (self:any) => {
    // Aquí podrías disparar un método para activar/animar tus ondas de audio
    // console.log('El dictado de la IA ha comenzado');
    this.isTyping = true; // Por ejemplo, podrías usar una variable para mostrar/ocultar las ondas
  },
  onStringTyped: (arrayPos:number, self:any) => {
    // Podrías detener la animación de las ondas aquí brevemente
    // console.log('La IA ha terminado de "hablar" esta frase');
    this.isTyping = false; // Por ejemplo, podrías usar una variable para mostrar/ocultar las ondas
  }
};

    // Instanciamos la librería apuntando a nuestro elemento seguro
    new Typed(this.textoDictado.nativeElement, options);
  }
}