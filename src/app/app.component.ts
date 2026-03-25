import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink,
    Navbar,
    Footer
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'portafolio-web';

  ngOnInit(): void {
    this.calcularAltoReal();
  }

  // Escucha los cambios de tamaño de ventana a nivel global
@HostListener('window:resize')
onResize() {
  this.calcularAltoReal();
}

  // Calcula y crea la variable CSS global --vh
  private calcularAltoReal() {
    // Verificamos que 'window' exista (útil si luego usas Server Side Rendering)
    if (typeof window !== 'undefined') {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }
}