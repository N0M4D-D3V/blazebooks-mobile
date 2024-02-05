import { HttpClient } from "@angular/common/http";
import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({ selector: "[bookstyles]", standalone: true })
export class BookStylesDirective implements OnInit {
  @Input() bookId!: string;

  constructor(
    private readonly http: HttpClient,
    private readonly renderer: Renderer2,
    private readonly el: ElementRef
  ) {}

  public ngOnInit(): void {
    const url: string = `assets/books/${this.bookId}/styles.scss`;

    this.http.get(url, { responseType: "text" }).subscribe({
      next: (cssContent) => this.loadAndApply(cssContent),
      error: (err) => this.handleError(err),
    });
  }

  private loadAndApply(cssContent: string): void {
    const styleElement = this.renderer.createElement("style");
    this.renderer.appendChild(
      styleElement,
      this.renderer.createText(cssContent)
    );

    this.renderer.appendChild(this.el.nativeElement, styleElement);
  }

  private handleError(error: any): void {
    if (error.status === 404)
      console.warn(`Styles not found for this book: '${this.bookId}'`);
  }
}
