import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '@interfaces/book.interface';
import { RoutePath } from '@interfaces/route.interface';
import { BookService } from '@services/book.service';
import {
  DemiCardConfig,
  DemiCardImgComponent,
  DemiCardListComponent,
  DemiCardSize,
  DemiSeparePipe,
} from 'demiurge';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-detail',
  template: `
    <demi-card-img
      [config]="selectedCard"
      (onReadTouched)="onRead($event)"
    ></demi-card-img>
    <p class="genre-text text-end px-3">
      <b>Genres: </b> {{ selectedCard.data?.genres | separe }}
    </p>
    <div class="container px-3">
      <p>{{ selectedCard.data?.description }}</p>
    </div>
    <demi-card-list
      [config$]="related"
      (onCardTouched)="onCardTouched($event)"
    ></demi-card-list>
  `,
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [DemiCardListComponent, DemiCardImgComponent, DemiSeparePipe],
})
export class DetailPage {
  public selectedCard: DemiCardConfig<Book> = this.bookService.getCurrentBook();
  public related: Observable<DemiCardConfig<Book>[]> = of(
    this.bookService.getRelatedBooks().map((x) => {
      x.size = DemiCardSize.S;
      return x;
    })
  );

  constructor(
    private readonly router: Router,
    private readonly bookService: BookService
  ) {}

  public onRead(card: DemiCardConfig<Book>): void {
    this.router.navigate([RoutePath.Reader]);
  }

  public onCardTouched(card: DemiCardConfig<Book>): void {
    this.router.navigate([RoutePath.Detail]);
  }
}
