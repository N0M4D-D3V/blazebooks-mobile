import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationStart, Router, RouterOutlet } from "@angular/router";
import { DemiToolbarComponent, DemiToolbarConfig } from "demiurge";
import { TOOLBAR_CONFIG } from "@config/toolbar.config";
import { RoutePath } from "./enum/route.enum";
import { Subscription, filter } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { StatusBar } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [DemiToolbarComponent, RouterOutlet, AsyncPipe],
  template: `
    @if (showToolbar) {
    <demi-toolbar [config]="toolbarConfig"></demi-toolbar>
    }
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  private subRoute!: Subscription;

  public readonly toolbarConfig: DemiToolbarConfig = TOOLBAR_CONFIG;
  public showToolbar: boolean = true;

  constructor(
    private readonly cdref: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.router.navigate([RoutePath.Home]);
    this.managePlugins();
    this.manageSubscriptions();
  }

  private async managePlugins(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await StatusBar.setOverlaysWebView({ overlay: false });
      await StatusBar.setBackgroundColor({ color: "transparent" });
      await StatusBar.hide();
    }
  }

  private manageSubscriptions(): void {
    this.subRoute = this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((ev: any) => {
        const url: string = ev.url;

        this.showToolbar = !url.includes(RoutePath.Reader);
        this.cdref.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.subRoute?.unsubscribe();
  }
}
