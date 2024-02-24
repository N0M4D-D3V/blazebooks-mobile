import { Component } from "@angular/core";
import { APP_VERSION } from "@config/app-info.config";
import { Email, SocialMedia } from "@enum/links.enum";

@Component({
  selector: "app-about",
  templateUrl: "./about.page.html",
  styleUrls: ["./about.page.scss"],
  standalone: true,
  imports: [],
})
export class AboutPage {
  public version: string = APP_VERSION;
  public supportEmail: string = Email.Support;
  public socialNetworkLinks = {
    IG: SocialMedia.IG,
    FB: SocialMedia.FB,
    YT: SocialMedia.YT,
    PayPal: SocialMedia.PayPal,
    Coffee: SocialMedia.Coffee,
  };

  public onBuyCoffee(): void {
    alert("Not implemented yet");
  }
  public onDonate(): void {
    alert("Not implemented yet");
  }
  public onRateApp(): void {
    alert("Not implemented yet");
  }
  public onReportBug(): void {
    alert("Not implemented yet");
  }
}
