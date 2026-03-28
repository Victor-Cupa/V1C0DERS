import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Typed from 'typed.js';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private typed: Typed | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initTyped();
    }
  }

  private initTyped(): void {
    this.typed = new Typed('.multiple-text', {
      strings: [

      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      loop: true
    });
  }

  ngOnDestroy(): void {
    if (this.typed) this.typed.destroy();
  }
}