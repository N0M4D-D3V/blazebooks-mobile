import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemiToolbarModule } from 'demiurge';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DemiToolbarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
