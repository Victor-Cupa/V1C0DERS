import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ScrollSpyService } from '../../services/scroll-spy';

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
export class Home implements OnInit, AfterViewInit, OnDestroy {
  private scrollSpyService = inject(ScrollSpyService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  
  private observer: IntersectionObserver | null = null;
  
  // Flujo para controlar la actualización de la URL sin saturar el Router
  private urlUpdate$ = new Subject<string>();

  ngOnInit(): void {
    // 1. Solución al LAG: Solo actualiza la URL si la sección se mantiene 150ms
    this.urlUpdate$.pipe(
      debounceTime(150),
      distinctUntilChanged()
    ).subscribe(sectionId => {
      this.router.navigate([], {
        fragment: sectionId,
        replaceUrl: true,
        queryParamsHandling: 'preserve'
      });
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
    this.urlUpdate$.complete();
  }

  private initIntersectionObserver(): void {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-25% 0px -65% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          const sectionId = entry.target.id;

          // El Navbar cambia instantáneamente para feedback visual
          this.scrollSpyService.updateSection(sectionId);

          // La URL espera a que el scroll termine (Debounce)
          this.urlUpdate$.next(sectionId);
        }
      });
    }, options);

    const sections = document.querySelectorAll('app-hero[id], app-about[id], app-portafolio[id], app-aliados[id], app-contacto[id]');
    sections.forEach((section) => this.observer?.observe(section));
  }
}