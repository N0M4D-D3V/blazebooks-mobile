import { Component } from "@angular/core";
import { Email, SocialMedia } from "@enum/links.enum";

@Component({
  selector: "app-about",
  templateUrl: "./about.page.html",
  styleUrls: ["./about.page.scss"],
  standalone: true,
  imports: [],
})
export class AboutPage {
  public supportEmail: string = Email.Support;
  public socialNetworkLinks = {
    IG: SocialMedia.IG,
    FB: SocialMedia.FB,
    YT: SocialMedia.YT,
    PayPal: SocialMedia.PayPal,
    Coffee: SocialMedia.Coffee,
  };
}
