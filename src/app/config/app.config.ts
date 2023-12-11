import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app-routes';

import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideRouter(ROUTES),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()),
    ]),
    //importProvidersFrom(BrowserModule, DemiToolbarModule),
  ],
};
