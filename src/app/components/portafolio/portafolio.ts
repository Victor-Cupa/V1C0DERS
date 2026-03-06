import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 




@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portafolio.html',
  styleUrl: './portafolio.css',
})
export class Portafolio {
  misProyectos = [
    {
      titulo: 'E-commerce App',
      descripcion: 'Plataforma de ventas desarrollada con Angular y Firebase.',
      link: '#',
      imagen: 'https://picsum.photos/400/250?random=1'
    },
    {
      titulo: 'Dashboard Administrativo',
      descripcion: 'Panel de control con gráficas en tiempo real para gestión de datos.',
      link: '#',
      imagen: 'https://picsum.photos/400/250?random=2'
    },
    {
      titulo: 'Sistema de Inventarios',
      descripcion: 'Software de escritorio adaptado a web para control de stock.',
      link: '#',
      imagen: 'https://picsum.photos/400/250?random=3'
    }
  ];
}

