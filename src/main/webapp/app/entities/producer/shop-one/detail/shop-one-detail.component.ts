import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShopOne } from '../shop-one.model';

@Component({
  selector: 'jhi-shop-one-detail',
  templateUrl: './shop-one-detail.component.html',
})
export class ShopOneDetailComponent implements OnInit {
  shopOne: IShopOne | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shopOne }) => {
      this.shopOne = shopOne;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
