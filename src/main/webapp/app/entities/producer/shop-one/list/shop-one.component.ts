import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShopOne } from '../shop-one.model';
import { ShopOneService } from '../service/shop-one.service';
import { ShopOneDeleteDialogComponent } from '../delete/shop-one-delete-dialog.component';

@Component({
  selector: 'jhi-shop-one',
  templateUrl: './shop-one.component.html',
})
export class ShopOneComponent implements OnInit {
  shopOnes?: IShopOne[];
  isLoading = false;

  constructor(protected shopOneService: ShopOneService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.shopOneService.query().subscribe({
      next: (res: HttpResponse<IShopOne[]>) => {
        this.isLoading = false;
        this.shopOnes = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IShopOne): number {
    return item.id!;
  }

  delete(shopOne: IShopOne): void {
    const modalRef = this.modalService.open(ShopOneDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shopOne = shopOne;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
