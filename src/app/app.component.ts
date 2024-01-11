import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { DemiToolbarComponent, DemiToolbarConfig } from 'demiurge';
import { TOOLBAR_CONFIG } from '@config/toolbar.config';
import { RoutePath } from './interfaces/route.interface';
import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';
import { Subscription, filter } from 'rxjs';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DemiToolbarComponent, RouterOutlet],
  template: `
    @if (user && !isLogin) {
    <demi-toolbar
      [user]="user"
      [config]="toolbarConfig"
      (onLogout)="onLogout()"
    ></demi-toolbar>
    }
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  private subUser!: Subscription;
  public user?: User;

  public readonly toolbarConfig: DemiToolbarConfig = TOOLBAR_CONFIG;
  public isLogin: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.subUser = this.userService
      .getUser()
      .subscribe((user: User) => (this.user = user));

    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((ev: any) => (this.isLogin = ev?.url === RoutePath.Login));
  }

  public async onLogout(): Promise<void> {
    this.authService
      .signOut()
      .then(() => this.router.navigate([RoutePath.Login]));
  }

  ngOnDestroy(): void {
    this.subUser.unsubscribe();
  }
}
