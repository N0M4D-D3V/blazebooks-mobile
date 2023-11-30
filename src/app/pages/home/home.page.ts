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

  public searchValue: string = '';

  public mainCard: DemiCardConfig = {
    id: '01',
    title: 'Book',
    description: 'Continue reading ...',
    isClickable: true,
    size: DemiCardSize.XL,
    onCardTouched: () => {
      this.router.navigate(['/reader']);
    },
  };

  public books: DemiCardConfig[] = [
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
  ];

  constructor(
    private readonly router: Router,
    private readonly toolbarService: ToolbarService
  ) {}

  ngOnInit(): void {
    this.subToolbar = this.toolbarService
      .searchObservable()
      .subscribe((value) => (this.searchValue = value ?? ''));
  }

  ngOnDestroy(): void {
    this.subToolbar.unsubscribe();
  }
}
