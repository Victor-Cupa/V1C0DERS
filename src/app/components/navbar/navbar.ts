import { Component, OnInit, inject } from '@angular/core'; // 1. Agregamos OnInit e inject
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { ScrollSpyService } from '../../services/scroll-spy'; // 2. Verificamos la ruta (el CLI suele agregar .service)


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  // 3. Inyectamos el servicio
  private scrollSpyService = inject(ScrollSpyService);

  seccionActiva: string = 'inicio';

  ngOnInit(): void {
    // 4. Nos suscribimos a la señal del Scroll Spy
    // Cada vez que el Home detecte una sección nueva, este código se ejecutará
    this.scrollSpyService.activeSection$.subscribe((sectionId) => {
      this.seccionActiva = sectionId;
      // Esto hará que [class.active] se actualice automáticamente en el HTML
    });
  }

  // Mantenemos esta función por si quieres forzar el estado al hacer clic
  setActive(seccion: string): void {
    this.seccionActiva = seccion;
  }
}
