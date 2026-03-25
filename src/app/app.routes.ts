import { Routes } from '@angular/router';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: 'inicio', component: Home },
  { path: 'sobre-mi', component: Home },
  { path: 'portafolio', component: Home},
  { path: 'contacto', component: Home },
  { path: 'aliados', component: Home },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' } // Comodín para evitar 404 internos
];
