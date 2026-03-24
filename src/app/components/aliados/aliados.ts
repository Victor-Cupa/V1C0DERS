import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Aliado {
  id: number;
  name: string;
  slogan: string;
  imageUrl: string;
}

@Component({
  selector: 'app-aliados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aliados.html',
  styleUrls: ['./aliados.css']
})
export class Aliados implements OnInit, OnDestroy {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  // Variables para controlar el carrusel dinámico
  currentIndex: number = 0;
  intervalId: any;
  cardWidth: number = 348; // 300px (tarjeta) + 48px (gap de 3rem aprox)
  isAutoScrolling: boolean = false;

  listaAliados: Aliado[] = [
    { id: 1, name: 'VCUPA Financial Hub', slogan: "Tu capital en movimiento", imageUrl: 'assets/vcupaFinancial.png' },
    { id: 2, name: 'QUIRO MOTOS 07', slogan: "Expertos en dos ruedas", imageUrl: 'assets/quiro_motos.png' },
    { id: 3, name: 'Running SKATE', slogan: "Desliza tu potencial, conquista la pista", imageUrl: 'assets/running.jpg' },
    { id: 4, name: 'Estacionate Park', slogan: "Tu tranquilidad se queda con nosotros.", imageUrl: 'assets/parkin.jpg' },
    { id: 5, name: 'Estacionate Park 2', slogan: "Siempre un lugar para ti.", imageUrl: 'assets/parkin.jpg' },
    { id: 6, name: 'QUIRO MOTOS 07', slogan: "Expertos en dos ruedas", imageUrl: 'assets/quiro_motos.png' },
  ];

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // ==========================================
  // LÓGICA DEL TEMPORIZADOR
  // ==========================================
  startAutoPlay(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3500); 
  }

  stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // ¡AQUÍ ESTÁ LA FUNCIÓN QUE FALTABA!
  resetTimer(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  // ==========================================
  // NAVEGACIÓN DEL CARRUSEL
  // ==========================================
  nextSlide(): void {
    if (this.currentIndex < this.listaAliados.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; 
    }
    this.updateScrollPosition();
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.listaAliados.length - 1; 
    }
    this.updateScrollPosition();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.updateScrollPosition();
    this.resetTimer(); 
  }

  // ==========================================
  // MANIPULACIÓN FÍSICA DEL DOM (SCROLL HORIZONTAL)
  // ==========================================
  updateScrollPosition(): void {
    if (this.carousel && this.carousel.nativeElement) {
      this.isAutoScrolling = true;
      
      const posicionX = this.currentIndex * this.cardWidth;

      // Usamos scrollTo para NO afectar el scroll vertical de la página
      this.carousel.nativeElement.scrollTo({ 
        left: posicionX,
        behavior: 'smooth' 
      });

      setTimeout(() => {
        this.isAutoScrolling = false;
      }, 800);
    }
  }

  onScroll(): void {
    if (this.isAutoScrolling) return;

    if (this.carousel && this.carousel.nativeElement) {
      const elementoHTML = this.carousel.nativeElement as HTMLElement;
      const scrollPosition = elementoHTML.scrollLeft;
      
      this.currentIndex = Math.round(scrollPosition / this.cardWidth);
    }
  }
}