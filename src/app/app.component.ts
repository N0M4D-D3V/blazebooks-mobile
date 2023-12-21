import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DemiToolbarComponent, DemiToolbarConfig } from 'demiurge';
import { TOOLBAR_CONFIG } from '@config/toolbar.config';
import { RoutePath } from './interfaces/route.interface';
import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DemiToolbarComponent, RouterOutlet],
  template: `
    @if (user) {
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

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.subUser = this.userService
      .getUser()
      .subscribe((user: User) => (this.user = user));
  }

  public onLogout(): void {
    this.userService;
    this.authService.signOut();
    this.router.navigate([RoutePath.Login]);
  }

  ngOnDestroy(): void {
    this.subUser.unsubscribe();
  }
}
