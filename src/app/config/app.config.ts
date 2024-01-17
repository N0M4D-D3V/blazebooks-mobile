import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app-routes';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

export const APP_CONFIG: ApplicationConfig = {
  providers: [provideHttpClient(), provideAnimations(), provideRouter(ROUTES)],
};
