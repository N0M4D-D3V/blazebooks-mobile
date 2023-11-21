import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { DemiCardModule } from 'demiurge';

@NgModule({
  imports: [CommonModule, HomePageRoutingModule, DemiCardModule],
  exports: [HomePage],
  declarations: [HomePage],
})
export class HomePageModule {}
