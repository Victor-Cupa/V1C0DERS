import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  // BehaviorSubject guarda la última sección detectada
  private activeSection = new BehaviorSubject<string>('inicio');
  activeSection$ = this.activeSection.asObservable();

  updateSection(sectionId: string) {
    this.activeSection.next(sectionId);
  }
}