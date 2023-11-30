import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemiCardConfig, DemiCardSize } from 'demiurge';
import { Subscription } from 'rxjs';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: [],
})
export class HomePage implements OnInit, OnDestroy {
  private subToolbar!: Subscription;

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

  constructor(
    private readonly router: Router,
    private readonly toolbarService: ToolbarService
  ) {}

  ngOnInit(): void {
    this.subToolbar = this.toolbarService
      .searchObservable()
      .subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.subToolbar.unsubscribe();
  }
}
