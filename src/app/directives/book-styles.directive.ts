import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Book } from '@interfaces/book.interface';

@Directive({ selector: '[bookstyles]', standalone: true })
export class BookStylesDirective implements OnInit {
  @Input() book!: Book;

  constructor(
    private readonly http: HttpClient,
    private readonly renderer: Renderer2,
    private readonly el: ElementRef
  ) {}

  public ngOnInit(): void {
    const url: string = `assets/books/${this.book.id}/styles.scss`;

    this.http
      .get(url, { responseType: 'text' })
      .subscribe((cssContent) => this.loadAndApply(cssContent));
  }

  private loadAndApply(cssContent: string): void {
    const styleElement = this.renderer.createElement('style');
    this.renderer.appendChild(
      styleElement,
      this.renderer.createText(cssContent)
    );

    this.renderer.appendChild(this.el.nativeElement, styleElement);
  }
}
