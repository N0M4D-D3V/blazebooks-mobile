import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { APP_CONFIG } from './app/app.config';

bootstrapApplication(AppComponent, APP_CONFIG).catch((err) =>
  console.error(err)
);
