import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proyecto } from '../portafolio/portafolio'; // Asegúrate de importar la interfaz Proyecto

@Component({
  selector: 'app-all-projects-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-projects-modal.html',
  styleUrls: ['./all-projects-modal.css']
})
export class AllProjectsModalComponent {
  // Recibe la lista completa
  @Input() todosLosProyectos: Proyecto[] = [];
  
  // Emite un evento para cerrar el modal
  @Output() cerrarModalEvent = new EventEmitter<void>();

  cerrarModal() {
    this.cerrarModalEvent.emit();
  }
}