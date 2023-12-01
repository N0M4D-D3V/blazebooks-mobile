import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { APP_CONFIG } from './app/config/app.config';

bootstrapApplication(AppComponent, APP_CONFIG).catch((err) =>
  console.error(err)
);
