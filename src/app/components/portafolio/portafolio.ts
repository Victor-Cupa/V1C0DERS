import { Component, OnInit, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AllProjectsModalComponent } from '../all-projects-modal/all-projects-modal';

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
  imports: [CommonModule, AllProjectsModalComponent],
  templateUrl: './portafolio.html',
  styleUrls: ['./portafolio.css']
})
export class Portafolio implements OnInit {
  private platformId = inject(PLATFORM_ID);
  modalAbierto: boolean = false;
  isMobile: boolean = false;

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
      titulo: 'Analizador de documentos',
      descripcion: 'Escuela de formación de patinaje Madrid Cundinamarca.',
      imagenUrl: 'assets/running.jpg',
      tecnologias: [
        { nombre: 'Angular', iconoUrl: 'assets/logos/angular.svg' },
        { nombre: 'Python', iconoUrl: 'assets/logos/python.svg' }
      ],
      linkProyecto: '#'
    },
    {
      id: 5,
      titulo: 'Calcular Algo',
      descripcion: 'Herramienta de procesamiento de datos para optimización de cálculos complejos.',
      imagenUrl: 'assets/running.jpg',
      tecnologias: [
        { nombre: 'Angular', iconoUrl: 'assets/logos/angular.svg' },
        { nombre: 'Python', iconoUrl: 'assets/logos/python.svg' }
      ],
      linkProyecto: '#'
    },
    {
      id: 6,
      titulo: 'Proyecto en Ejecución',
      descripcion: 'Módulo de gestión educativa en fase de despliegue.',
      imagenUrl: 'assets/running.jpg',
      tecnologias: [
        { nombre: 'Angular', iconoUrl: 'assets/logos/angular.svg' },
        { nombre: 'Python', iconoUrl: 'assets/logos/python.svg' }
      ],
      linkProyecto: '#'
    }
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  // GETTERS DINÁMICOS: La clave de tu solicitud
  get proyectosVisibles() {
    // Si es móvil muestra solo 1, si es desktop muestra 3
    return this.isMobile ? this.listaProyectos.slice(0, 1) : this.listaProyectos.slice(0, 3);
  }

  get proyectosParaModal() {
    // Si es móvil manda del 2 en adelante al modal, si es desktop manda del 4 en adelante
    return this.isMobile ? this.listaProyectos.slice(1) : this.listaProyectos.slice(3);
  }

  abrirModalProyectos() { this.modalAbierto = true; }
  cerrarModalProyectos() { this.modalAbierto = false; }
}