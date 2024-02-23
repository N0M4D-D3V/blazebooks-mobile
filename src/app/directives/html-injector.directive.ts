import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[htmlInjector]",
  standalone: true,
})
export class HtmlInjectorDirective implements OnInit {
  @Input() plainHtml!: string;

  constructor(
    private readonly renderer: Renderer2,
    private readonly el: ElementRef
  ) {}

  ngOnInit() {
    this.loadHtml();
  }

  private loadHtml(): void {
    // clear existing content
    this.renderer.setProperty(this.el.nativeElement, "innerHTML", "");
    // inject the new html content
    this.renderer.setProperty(
      this.el.nativeElement,
      "innerHTML",
      this.plainHtml
    );
  }
}
