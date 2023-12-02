import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DemiToolbarComponent, DemiToolbarConfig } from 'demiurge';
import { TOOLBAR_CONFIG } from '@config/toolbar.config';
import { RoutePath } from './interfaces/route.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DemiToolbarComponent, RouterOutlet],
  template: `
    <demi-toolbar
      [config]="toolbarConfig"
      (onLogout)="onLogout()"
    ></demi-toolbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  public readonly toolbarConfig: DemiToolbarConfig = TOOLBAR_CONFIG;

  constructor(private readonly router: Router) {}

  public onLogout(): void {
    this.router.navigate([RoutePath.Login]);
  }
}
