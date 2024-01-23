import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationStart, Router, RouterOutlet } from "@angular/router";
import { DemiToolbarComponent, DemiToolbarConfig } from "demiurge";
import { TOOLBAR_CONFIG } from "@config/toolbar.config";
import { RoutePath } from "./enum/route.enum";
import { AuthService } from "@services/auth.service";
import { Observable, Subscription, filter, tap } from "rxjs";
import { User } from "@interfaces/user.interface";
import { AsyncPipe } from "@angular/common";
import { StatusBar } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [DemiToolbarComponent, RouterOutlet, AsyncPipe],
  template: `
    @if (showToolbar) {
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
  private subRoute!: Subscription;

  public readonly toolbarConfig: DemiToolbarConfig = TOOLBAR_CONFIG;
  public showToolbar: boolean = true;

  public user?: User;

  constructor(
    private readonly cdref: ChangeDetectorRef,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.managePlugins();
    this.manageSubscriptions();
  }

  private async managePlugins(): Promise<void> {
    if (Capacitor.isNativePlatform()) await StatusBar.hide();
  }

  private manageSubscriptions(): void {
    this.subUser = this.authService
      .$getUser()
      .pipe(filter((response) => !!response))
      .subscribe((res) => (this.user = res));

    this.subRoute = this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((ev: any) => {
        this.showToolbar =
          ev?.url !== RoutePath.Reader && ev?.url !== RoutePath.Login;
        this.cdref.detectChanges();
      });
  }

  public async onLogout(): Promise<void> {
    this.authService
      .signOut()
      .then(() => this.router.navigate([RoutePath.Login]));
  }

  ngOnDestroy(): void {
    this.subRoute.unsubscribe();
  }
}
