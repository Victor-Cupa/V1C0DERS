import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit {
  ngOnInit(): void {
    const options = {
      strings: ['Desarrollador de Software', 'Ingeniero de Sistemas', 'Especialista Pop!_OS'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true
    };

    const typed = new Typed('.multiple-text', options);
  }
}