import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para [class.active]

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar{
  // Inicializamos en la sección de inicio
  seccionActiva: string = 'inicio';

  // Función para actualizar el estado al hacer clic
  setActive(seccion: string): void {
    this.seccionActiva = seccion;
  }
}
