import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShopTwo } from '../shop-two.model';

@Component({
  selector: 'jhi-shop-two-detail',
  templateUrl: './shop-two-detail.component.html',
})
export class ShopTwoDetailComponent implements OnInit {
  shopTwo: IShopTwo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shopTwo }) => {
      this.shopTwo = shopTwo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
