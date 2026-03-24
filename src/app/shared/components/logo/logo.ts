import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg 
      [attr.width]="width" 
      [attr.height]="height" 
      viewBox="0 0 100 125" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      class="cupalab-logo"
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <g [attr.filter]="showGlow ? 'url(#glow)' : null">
        <path class="logo-accent-cian" d="M50 10 C30 10, 15 25, 15 45 C15 60, 25 70, 35 75 L35 85 L65 85 L65 75 C75 70, 85 60, 85 45 C85 25, 70 10, 50 10 Z" stroke-width="2.5"/>
        <path class="logo-accent-cian logo-data-lines" d="M35 85 Q 50 70, 65 85 M40 80 Q 50 65, 60 80 M45 75 Q 50 60, 55 75" stroke-width="1.5" stroke-linecap="round"/>
        
        <path class="logo-accent-cian logo-code-symbol" d="M42 35 L33 45 L42 55 M58 35 L67 45 L58 55 M53 30 L47 60" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>

        <text x="50" y="93" text-anchor="middle" class="logo-text-base" font-family="Verdana, Geneva, sans-serif" font-size="7" font-weight="bold">CUPA</text>
      </g>
      
      <path class="logo-text-base" d="M35 85 L65 85 L62 95 L38 95 Z M38 95 L62 95 L60 100 L40 100 Z" stroke-width="2"/>
    </svg>
  `,
  styles: [`
    :host {
      display: inline-block;
      line-height: 0;
    }
    .cupalab-logo {
      /* Transición suave si cambias colores dinámicamente */
      transition: all 0.3s ease;
    }
    /* El Cian Eléctrico de tu Web */
    .logo-accent-cian {
      stroke: #00ffff; /* Puedes usar 'currentColor' si prefieres controlarlo desde el padre */
    }
    .logo-code-symbol {
      stroke-width: 5; /* Un poco más grueso para que resalte el código */
    }
    .logo-data-lines {
      opacity: 0.7; /* Sutil red de datos */
    }
    /* Color para la base y texto 'CUPA' (Gris Claro/Blanco para Dark Mode) */
    .logo-text-base {
      stroke: #e0e0e0;
      fill: #e0e0e0; /* El texto necesita fill */
    }
  `]
})
export class LogoComponent {
  // Inputs para controlar tamaño fácilmente desde el padre
  @Input() width: string = '100px'; 
  @Input() height: string = 'auto'; // Mantiene proporción
  @Input() showGlow: boolean = true; // Controlar el efecto de brillo
}
