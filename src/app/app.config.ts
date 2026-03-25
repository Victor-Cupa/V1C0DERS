import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// 1. Asegúrate de incluir withInMemoryScrolling en este import
import { provideRouter, withInMemoryScrolling } from '@angular/router'; 

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes, 
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
    )
  ]
};