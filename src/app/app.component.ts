import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { DemiToolbarComponent, DemiToolbarConfig } from 'demiurge';
import { TOOLBAR_CONFIG } from '@config/toolbar.config';
import { RoutePath } from './interfaces/route.interface';
import { AuthService } from '@services/auth.service';
import { Subscription, filter } from 'rxjs';
import { User } from '@interfaces/user.interface';
import { AsyncPipe } from '@angular/common';
import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DemiToolbarComponent, RouterOutlet, AsyncPipe],
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
  private subUser?: Subscription;
  public user?: User;

  public readonly toolbarConfig: DemiToolbarConfig = TOOLBAR_CONFIG;
  public isLogin: boolean = false;

  constructor(
    private readonly cdref: ChangeDetectorRef,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    if (Capacitor.isNativePlatform()) await StatusBar.hide();

    this.subUser = this.authService
      .$getUser()
      .pipe(filter((response) => !!response))
      .subscribe((usr) => {
        this.user = usr;
        this.cdref.detectChanges();
      });

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
    this.subUser?.unsubscribe();
  }
}
