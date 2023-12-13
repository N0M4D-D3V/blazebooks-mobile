import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app-routes';

import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { provideAnimations } from '@angular/platform-browser/animations';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(ROUTES),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()),
    ]),
  ],
};
