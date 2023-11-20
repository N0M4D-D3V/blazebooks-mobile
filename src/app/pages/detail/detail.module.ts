import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DetailPage } from './detail.page';
import { DetailPageRoutingModule } from './detail-routing.module';

@NgModule({
  imports: [CommonModule, DetailPageRoutingModule],
  exports: [DetailPage],
  declarations: [DetailPage],
})
export class DetailPageModule {}
