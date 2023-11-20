import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchPage } from './search.page';
import { SearchPageRoutingModule } from './search-routing.module';

@NgModule({
  imports: [CommonModule, SearchPageRoutingModule],
  exports: [SearchPage],
  declarations: [SearchPage],
})
export class SearchPageModule {}
