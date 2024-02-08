import { Component } from "@angular/core";
import { Email } from "@enum/links.enum";

@Component({
  selector: "app-community",
  templateUrl: "./community.page.html",
  styleUrls: ["./community.page.scss"],
  standalone: true,
  imports: [],
})
export class CommunityPage {
  public supportEmail: string = Email.Support;
}
