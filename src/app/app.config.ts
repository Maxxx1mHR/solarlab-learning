import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from './myPreset';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from 'primeng/api';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { AuthorizationService } from '@core';
import { firstValueFrom } from 'rxjs';

// function initAuth(auth: AuthorizationService) {
//   return () => firstValueFrom(auth.currentUser());
// }

function initAuth(auth: AuthorizationService) {
  return () => auth.currentUser();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
      },
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
    MessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [AuthorizationService],
      multi: true,
    },
  ],
};
