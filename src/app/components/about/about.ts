import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import Typed from 'typed.js';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  
  @ViewChild('textoDictado') textoDictado!: ElementRef;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  private typed: Typed | null = null;
  
  // Definimos el texto en una propiedad para usarlo en ambos casos
  readonly aboutDescription = "Me especializo en transformar ideas en productos digitales fluidos, cuidando cada detalle del rendimiento y la estética. Mi objetivo es entregar herramientas robustas que aporten valor real.";

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupVideo();
      
      // --- NUEVA LÓGICA DE DETECCIÓN MÓVIL ---
      const isMobile = window.innerWidth <= 991;
      this.handleTextContent(isMobile);
    }
  }

  private setupVideo(): void {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      video.muted = true;
      video.volume = 0;
      
      video.play().catch(err => {
        console.warn("Autoplay bloqueado:", err);
      });
    }
  }

  // --- LÓGICA DE TEXTO FIJO VS ANIMADO ---
  private handleTextContent(isMobile: boolean): void {
    if (this.textoDictado && this.textoDictado.nativeElement) {
      // Limpiamos el span siempre
      this.textoDictado.nativeElement.innerHTML = '';
      
      if (isMobile) {
        // En Móvil: Insertamos el texto directamente (estático)
        this.textoDictado.nativeElement.innerText = this.aboutDescription;
      } else {
        // En Escritorio: Iniciamos Typed.js
        this.initTypingEffect();
      }
    }
  }

  private initTypingEffect(): void {
    // Si ya existe una instancia por navegación, la destruimos
    if (this.typed) { this.typed.destroy(); }

    const options = {
      strings: [this.aboutDescription], // Usamos la propiedad compartida
      typeSpeed: 40,
      backSpeed: 0,
      loop: true,
      backDelay: 3000,
      showCursor: true,
      cursorChar: '|'
    };

    this.typed = new Typed(this.textoDictado.nativeElement, options);
  }

  ngOnDestroy(): void {
    if (this.typed) { this.typed.destroy(); }
  }
}