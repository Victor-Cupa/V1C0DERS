import { Routes } from '@angular/router';
import { Home } from './components/home/home';

export const routes: Routes = [
  // 1. Definimos una única ruta para el Home. 
  // Al dejar el path vacío (''), cargará en localhost:8888/
  { path: '', component: Home },

  // 2. Redirecciones de compatibilidad:
  // Si tenías enlaces externos apuntando a /inicio, /sobre-mi, etc.,
  // los redirigimos a la raíz con su respectivo fragmento.
  { path: 'inicio', redirectTo: '', pathMatch: 'full' },
  { path: 'sobre-mi', redirectTo: '', pathMatch: 'full' },
  { path: 'portafolio', redirectTo: '', pathMatch: 'full' },
  { path: 'contacto', redirectTo: '', pathMatch: 'full' },
  { path: 'aliados', redirectTo: '', pathMatch: 'full' },

  // 3. Comodín (404): Cualquier ruta no existente vuelve al Home
  { path: '**', redirectTo: '' }
];