import { Component } from '@angular/core';
// Importamos apuntando exactamente a los nombres cortos que te generó tu consola
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about'; // Asegúrate de que este nombre coincida con tu archivo real en la carpeta about
import { Contacto } from './components/contacto/contacto';
import { Footer } from './components/footer/footer';
import { Portafolio } from './components/portafolio/portafolio';  

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, About, Contacto, Footer, Portafolio],
  // IMPORTANTE: Asegúrate de que estos dos nombres coincidan con los archivos reales de tu carpeta app
  templateUrl: './app.component.html', // (Cámbialo a './app.html' si tu archivo se llama así)
  styleUrl: './app.component.css'      // (Cámbialo a './app.css' si tu archivo se llama así)
})
export class AppComponent {
  title = 'portafolio-web';
}