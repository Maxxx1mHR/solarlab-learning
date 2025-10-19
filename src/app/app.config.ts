import {
  APP_INITIALIZER,
  ApplicationConfig,
  LOCALE_ID,
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
import { catchError, firstValueFrom, of } from 'rxjs';
import '@angular/common/locales/global/ru';

// function initAuth(auth: AuthorizationService) {
//   return () => firstValueFrom(auth.currentUser());
// }

function initAuth(auth: AuthorizationService) {
  return () =>
    firstValueFrom(auth.currentUser()?.pipe(catchError(() => of(null))));
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
    { provide: LOCALE_ID, useValue: 'ru-RU' },
  ],
};
