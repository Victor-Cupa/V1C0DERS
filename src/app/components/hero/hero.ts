import { Component, OnInit } from '@angular/core';

// Declaramos Typed para que TypeScript no se queje de que no lo conoce
declare var Typed: any;

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit {
  // Ya no necesitamos la variable cargoProfesional porque Typed la escribirá por nosotros
    
  ngOnInit(): void {
    // La magia ocurre aquí cuando el componente carga
    const options = {
      strings: ['Desarrollador de Software', 'Ingeniero de Sistemas', 'Especialista Pop!_OS'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true
    };

    const typed = new Typed('.multiple-text', options);
  }
}