import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-about',
  standalone: true,
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
    "Me especializo en transformar ideas en productos digitales fluidos, cuidando cada detalle del rendimiento y la estética. Mi objetivo es siempre el mismo: entregar herramientas robustas que simplifiquen procesos y aporten valor real desde el primer despliegue."
    // Puedes añadir más frases aquí, separadas por coma, y las escribirá en secuencia
  ],
typeSpeed: 35,       
  backSpeed: 0,        // Velocidad 0 = borrado instantáneo completo
  backDelay: 2500,     
  startDelay: 800,     
  smartBackspace: false, // Fuerza a que borre toda la cadena de una vez
  // EL FIX CRÍTICO PARA REPETIR:
  loop:  true,      // ¡ACTÍVALO! Esto hará que la animación nunca se detenga
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