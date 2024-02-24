import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({ selector: "[scssInjector]", standalone: true })
export class ScssInjectorDirective implements OnInit {
  @Input() plainScss?: string;

  constructor(
    private readonly renderer: Renderer2,
    private readonly el: ElementRef
  ) {}

  public ngOnInit(): void {
    this.loadAndApply();
  }

  private loadAndApply(): void {
    if (!this.plainScss) return;

    const styleElement = this.renderer.createElement("style");
    this.renderer.appendChild(
      styleElement,
      this.renderer.createText(this.plainScss)
    );

    this.renderer.appendChild(this.el.nativeElement, styleElement);
  }
}
