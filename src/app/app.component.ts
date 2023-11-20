import { Component } from '@angular/core';
import { DemiToolbarConfig } from 'demiurge';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly toolbarConfig: DemiToolbarConfig = {
    title: 'Blazebooks',
    toggleable: true,
    toggleTitle: 'Blazebooks',
  };
}
