import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { DemiCardModule } from 'demiurge';
import { SearchPipe } from 'src/app/pipes/search.pipe';

@NgModule({
  imports: [CommonModule, HomePageRoutingModule, DemiCardModule, SearchPipe],
  exports: [HomePage],
  declarations: [HomePage],
})
export class HomePageModule {}
