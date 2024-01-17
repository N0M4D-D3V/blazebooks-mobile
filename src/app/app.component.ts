import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { DemiToolbarComponent, DemiToolbarConfig } from 'demiurge';
import { TOOLBAR_CONFIG } from '@config/toolbar.config';
import { RoutePath } from './interfaces/route.interface';
import { AuthService } from '@services/auth.service';
import { Observable, filter, tap } from 'rxjs';
import { User } from '@interfaces/user.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DemiToolbarComponent, RouterOutlet, AsyncPipe],
  template: `
    @if (($user | async); as usr) {
    <demi-toolbar
      [user]="usr"
      [config]="toolbarConfig"
      (onLogout)="onLogout()"
    ></demi-toolbar>
    }
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  public $user?: Observable<User | undefined>;

  public readonly toolbarConfig: DemiToolbarConfig = TOOLBAR_CONFIG;
  public isLogin: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.$user = this.authService
      .$getUser()
      .pipe(filter((response) => !!response));

    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((ev: any) => (this.isLogin = ev?.url === RoutePath.Login));
  }

  public async onLogout(): Promise<void> {
    this.authService
      .signOut()
      .then(() => this.router.navigate([RoutePath.Login]));
  }

  ngOnDestroy(): void {}
}
