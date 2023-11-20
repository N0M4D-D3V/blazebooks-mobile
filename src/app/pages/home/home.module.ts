import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [CommonModule, HomePageRoutingModule],
  exports: [HomePage],
  declarations: [HomePage],
})
export class HomePageModule {}
