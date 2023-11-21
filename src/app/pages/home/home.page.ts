import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DemiCardConfig, DemiCardSize } from 'demiurge';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: [],
})
export class HomePage {
  public mainCard: DemiCardConfig = {
    title: 'Book',
    description: 'Continue reading ...',
    isClickable: true,
    size: DemiCardSize.XL,
    onCardTouched: () => {
      this.router.navigate(['/reader']);
    },
  };

  public secondaryCard: DemiCardConfig = {
    title: 'New',
    description: 'Read Now!',
    isClickable: true,
    cssClass: 'mx-1',
    size: DemiCardSize.S,
    onCardTouched: () => {
      this.router.navigate(['/detail']);
    },
  };

  constructor(private readonly router: Router) {}
}
