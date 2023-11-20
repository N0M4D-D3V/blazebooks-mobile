import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReaderPage } from './reader.page';
import { ReaderPageRoutingModule } from './reader-routing.module';

@NgModule({
  imports: [CommonModule, ReaderPageRoutingModule],
  exports: [ReaderPage],
  declarations: [ReaderPage],
})
export class ReaderPageModule {}
