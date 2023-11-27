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
    toggleable: true,
    toggleTitle: 'Blazebooks',
    items: [
      { label: 'home', url: '/home', icon: 'bi-house' },
      { label: 'search', url: '/search', icon: 'bi-search' },
    ],
  };

  constructor(private readonly router: Router) {}

  public onLogout(): void {
    console.log('que pasa');
    this.router.navigate(['/login']);
  }
}
