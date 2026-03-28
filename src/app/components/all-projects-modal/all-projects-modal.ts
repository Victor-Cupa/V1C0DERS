import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Proyecto } from '../portafolio/portafolio';

@Component({
  selector: 'app-all-projects-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-projects-modal.html',
  styleUrls: ['./all-projects-modal.css']
})
export class AllProjectsModalComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  @Input() todosLosProyectos: Proyecto[] = [];
  @Output() cerrarModalEvent = new EventEmitter<void>();
  
  // Referencia para controlar el carrusel por código
  @ViewChild('carruselContainer') carruselContainer!: ElementRef;
  private autoScrollInterval: any;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Iniciamos el movimiento solo si la pantalla es móvil
      if (window.innerWidth <= 768) {
        this.startAutoCarousel();
      }
    }
  }

  private startAutoCarousel() {
    this.autoScrollInterval = setInterval(() => {
      const container = this.carruselContainer.nativeElement;
      const scrollAmount = container.offsetWidth * 0.85; // Desplazar casi una card completa

      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' }); // Reset al inicio
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 4500); // Cambio cada 4.5 segundos para dar tiempo de lectura
  }

  cerrarModal() {
    this.cerrarModalEvent.emit();
  }

  ngOnDestroy() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }
}