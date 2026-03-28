import { Component, OnInit, OnDestroy, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { ScrollSpyService } from '../../services/scroll-spy'; 
import { Subscription } from 'rxjs'; // Nécessaire pour la désinscription

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnDestroy {
  private scrollSpyService = inject(ScrollSpyService);
  private scrollSub!: Subscription; // Pour stocker la souscription

  seccionActiva: string = 'inicio';
  isMenuOpen: boolean = false; // Nouvel état pour le menu mobile

  ngOnInit(): void {
    // Souscription sécurisée
    this.scrollSub = this.scrollSpyService.activeSection$.subscribe((sectionId: string) => {
      this.seccionActiva = sectionId;
    });
  }

  ngOnDestroy(): void {
    // Conservation de la fonctionnalité et performance : désinscription critique
    if (this.scrollSub) {
      this.scrollSub.unsubscribe();
    }
  }

toggleMenu(): void {
  this.isMenuOpen = !this.isMenuOpen;
  this.updateScrollLock();
}

closeMenu(): void {
  this.isMenuOpen = false;
  this.updateScrollLock();
}

private updateScrollLock(): void {
  if (this.isMenuOpen) {
    document.body.style.overflow = 'hidden'; // Bloquea el scroll
  } else {
    document.body.style.overflow = 'auto'; // Libera el scroll
  }
}

  // Fonction conservée selon ta demande
  setActive(seccion: string): void {
    this.seccionActiva = seccion;
  }
}
