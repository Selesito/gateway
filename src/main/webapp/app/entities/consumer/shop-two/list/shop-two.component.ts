import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShopTwo } from '../shop-two.model';
import { ShopTwoService } from '../service/shop-two.service';
import { ShopTwoDeleteDialogComponent } from '../delete/shop-two-delete-dialog.component';

@Component({
  selector: 'jhi-shop-two',
  templateUrl: './shop-two.component.html',
})
export class ShopTwoComponent implements OnInit {
  shopTwos?: IShopTwo[];
  isLoading = false;

  constructor(protected shopTwoService: ShopTwoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.shopTwoService.query().subscribe({
      next: (res: HttpResponse<IShopTwo[]>) => {
        this.isLoading = false;
        this.shopTwos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IShopTwo): number {
    return item.id!;
  }

  delete(shopTwo: IShopTwo): void {
    const modalRef = this.modalService.open(ShopTwoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shopTwo = shopTwo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
