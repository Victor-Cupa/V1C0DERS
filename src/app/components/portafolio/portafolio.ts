import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MiniTech {
  nombre: string;
  iconoUrl: string;
}

export interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  tecnologias: MiniTech[]; 
  linkProyecto: string;
}

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portafolio.html',
  styleUrls: ['./portafolio.css']
})
export class Portafolio {

  listaProyectos: Proyecto[] = [
    {
      id: 1,
      titulo: 'VCUPA Financial Hub',
      descripcion: 'Plataforma de gestión financiera dinámica y centralizada para optimizar el flujo de capital.',
      imagenUrl: 'assets/vcupaFinancial.png',
      tecnologias: [
        { nombre: 'Angular', iconoUrl: 'assets/logos/angular.svg' },
        { nombre: 'Python', iconoUrl: 'assets/logos/python.svg' },
        { nombre: 'PostgreSQL', iconoUrl: 'assets/logos/postgresql.svg' }
      ],

      linkProyecto: '#'
    },
    {
      id: 2,
      titulo: 'Estacionate Park',
      descripcion: 'Sistema integral de control, facturación y monitoreo en tiempo real para parqueaderos.',
      imagenUrl: 'assets/parkin.jpg',
      tecnologias: [
        { nombre: 'Angular', iconoUrl: 'assets/logos/angular.svg' },
        { nombre: 'Node.js', iconoUrl: 'assets/logos/nodejs.svg' }
      ],

      linkProyecto: '#'
    },
    {
      id: 3,
      titulo: 'Quiro Motos 07',
      descripcion: 'Software de administración de inventario y agendamiento de servicios para taller mecánico.',
      imagenUrl: 'assets/quiro_motos.png',
      tecnologias: [
        { nombre: 'Angular', iconoUrl: 'assets/logos/angular.svg' },
        { nombre: 'Python', iconoUrl: 'assets/logos/python.svg' }
      ],

      linkProyecto: '#'
    },
      {
      id: 4,
      titulo: 'Running Skate',
      descripcion: 'Escuela de formacion de patinaje Madrid cundinamarca.',
      imagenUrl: 'assets/running.jpg',
      tecnologias: [
        { nombre: 'Angular', iconoUrl: 'assets/logos/angular.svg' },
        { nombre: 'Python', iconoUrl: 'assets/logos/python.svg' }
      ],

      linkProyecto: '#'
    }
  ];
}