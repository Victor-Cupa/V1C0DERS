import { Component, OnInit, AfterViewInit, inject } from '@angular/core'; // 1. Agregamos AfterViewInit e inject
import { ScrollSpyService } from '../../services/scroll-spy'; // 2. Verificamos la ruta (el CLI suele agregar .service)
import { CommonModule } from '@angular/common';

// Importamos los componentes hijos
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Contacto } from '../contacto/contacto';
import { Portafolio } from '../portafolio/portafolio';
import { Aliados } from '../aliados/aliados';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Hero, About, Portafolio, Contacto, Aliados],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit {
  // 3. Inyectamos el servicio de forma moderna usando inject()
  private scrollSpyService = inject(ScrollSpyService);

  constructor() {}

  ngOnInit(): void {
    // Lógica inicial si la necesitas
  }

  // 4. Este método es vital: se ejecuta cuando el HTML ya está dibujado en el DOM
  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null, // Usa el viewport del navegador
      // Esta zona define qué parte de la pantalla "activa" la sección. 
      // El -20% arriba y -70% abajo crea una "ventana" de detección en el tercio superior.
      rootMargin: '-20% 0px -70% 0px', 
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 5. Verificamos que la sección esté entrando y que tenga un ID asignado
        if (entry.isIntersecting && entry.target.id) {
          this.scrollSpyService.updateSection(entry.target.id);
        }
      });
    }, options);

    // 6. Seleccionamos los componentes por sus etiquetas. 
    // Asegúrate de que en home.html tengan el id (id="inicio", id="portafolio", etc.)
    const sections = document.querySelectorAll('app-hero, app-about, app-portafolio, app-contacto, app-aliados');
    
    sections.forEach(section => observer.observe(section));
  }
}