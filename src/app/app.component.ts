import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DemiToolbarConfig, DemiToolbarModule } from 'demiurge';
import { ToolbarService } from './services/toolbar.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [DemiToolbarModule, RouterOutlet],
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
        activeButtons: ['toggle', 'search'],
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
      {
        label: 'detail',
        url: '/detail',
        activeButtons: ['back'],
        hidden: true,
      },
    ],
  };

  constructor(
    private readonly router: Router,
    private readonly toolbarService: ToolbarService
  ) {}

  public onSearch(ev: string): void {
    this.toolbarService.searchIn(ev);
  }

  public onLogout(): void {
    this.router.navigate(['/login']);
  }
}
