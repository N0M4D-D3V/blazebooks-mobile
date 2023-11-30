import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DemiCardConfig, DemiCardSize } from 'demiurge';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  public currentBook$: Observable<DemiCardConfig> = of({
    id: '01',
    title: 'Book',
    description: 'Continue reading ...',
    isClickable: true,
    size: DemiCardSize.XL,
    onCardTouched: () => {
      this.router.navigate(['/reader']);
    },
  });
  public books$: Observable<DemiCardConfig[]> = of([
    {
      id: '02',
      title: 'New',
      description: 'Read Now!',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate(['/detail']);
      },
    },
    {
      id: '03',
      title: 'New',
      description: 'Read Now!',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate(['/detail']);
      },
    },
    {
      id: '04',
      title: 'New',
      description: 'Read Now!',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate(['/detail']);
      },
    },
    {
      id: '05',
      title: 'New',
      description: 'Read Now!',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate(['/detail']);
      },
    },
    {
      id: '06',
      title: 'New',
      description: 'Read Now!',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate(['/detail']);
      },
    },
    {
      id: '07',
      title: 'New',
      description: 'Read Now!',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate(['/detail']);
      },
    },
    {
      id: '08',
      title: 'New',
      description: 'Read Now!',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate(['/detail']);
      },
    },
    {
      id: '09',
      title: 'New',
      description: 'Read Now!',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate(['/detail']);
      },
    },
    {
      id: '10',
      title: 'New',
      description: 'Read Now!',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate(['/detail']);
      },
    },
    {
      id: '11',
      title: 'New',
      description: 'Read Now!',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate(['/detail']);
      },
    },
  ]);

  constructor(private readonly router: Router) {}
}
