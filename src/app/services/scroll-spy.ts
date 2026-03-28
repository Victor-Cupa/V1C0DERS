import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  // Estado de la sección activa
  private activeSection = new BehaviorSubject<string>('inicio');
  activeSection$ = this.activeSection.asObservable();

  /**
   * Actualiza la sección activa. 
   * Este es el método que soluciona el error en home.ts
   */
  updateSection(sectionId: string): void {
    if (sectionId && sectionId !== this.activeSection.value) {
      this.activeSection.next(sectionId);
    }
  }
}