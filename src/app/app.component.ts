import { Component, HostListener, OnInit } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Contacto } from './components/contacto/contacto';
import { Footer } from './components/footer/footer';
import { Portafolio } from './components/portafolio/portafolio';
import { Aliados } from './components/aliados/aliados';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, Hero, About, Contacto, Footer, Portafolio, Aliados,],
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