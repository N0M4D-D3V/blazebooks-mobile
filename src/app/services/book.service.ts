import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DemiCardConfig, DemiCardSize } from 'demiurge';
import { Observable, of } from 'rxjs';
import { RoutePath } from '@interfaces/route.interface';

@Injectable({ providedIn: 'root' })
export class BookService {
  public currentBook$: Observable<DemiCardConfig> = of({
    id: '01',
    title: '1984',
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
      title: 'Un mundo feliz',
      description: 'Novela distopica',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate([RoutePath.Detail]);
      },
    },
    {
      id: '03',
      title: 'Snow Crash',
      description: 'Cyberpunk',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate([RoutePath.Detail]);
      },
    },
    {
      id: '04',
      title: 'Eragon',
      description: 'Fantasia',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate([RoutePath.Detail]);
      },
    },
    {
      id: '05',
      title: 'Madrid Zombie',
      description: 'Novela Interactiva',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate([RoutePath.Detail]);
      },
    },
    {
      id: '06',
      title: 'Cisne Negro',
      description: 'Ensayo',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate([RoutePath.Detail]);
      },
    },
    {
      id: '07',
      title: 'Economia Basica',
      description: 'Ensayo',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate([RoutePath.Detail]);
      },
    },
    {
      id: '08',
      title: 'Lean Startup',
      description: 'Ensayo',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate([RoutePath.Detail]);
      },
    },
    {
      id: '09',
      title: 'Gambito de Caballo',
      description: 'Novela',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate([RoutePath.Detail]);
      },
    },
    {
      id: '10',
      title: 'Fahrenheit 451',
      description: 'Distopía',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate([RoutePath.Detail]);
      },
    },
    {
      id: '11',
      title: 'Blade Runner',
      description: 'Cyberpunk',
      isClickable: true,
      cssClass: 'mx-1',
      size: DemiCardSize.S,
      onCardTouched: () => {
        this.router.navigate([RoutePath.Detail]);
      },
    },
  ]);

  constructor(private readonly router: Router) {}
}
