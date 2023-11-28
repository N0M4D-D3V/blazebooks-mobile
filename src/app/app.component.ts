import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DemiToolbarConfig } from 'demiurge';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly toolbarConfig: DemiToolbarConfig = {
    title: 'Blazebooks',
    toggleTitle: 'Blazebooks',
    items: [
      {
        label: 'login',
        url: '/login',
        hidden: true,
      },
      {
        label: 'home',
        url: '/home',
        icon: 'bi-house',
        toggleable: true,
        activeButtons: ['toggle'],
      },
      {
        label: 'search',
        url: '/search',
        icon: 'bi-search',
        toggleable: true,
        activeButtons: ['back'],
      },
      {
        label: 'reader',
        url: '/reader',
        activeButtons: ['back'],
        hidden: true,
      },
    ],
  };

  constructor(private readonly router: Router) {}

  public onLogout(): void {
    this.router.navigate(['/login']);
  }
}
