import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IShopOne } from '../shop-one.model';
import { ShopOneService } from '../service/shop-one.service';

@Component({
  templateUrl: './shop-one-delete-dialog.component.html',
})
export class ShopOneDeleteDialogComponent {
  shopOne?: IShopOne;

  constructor(protected shopOneService: ShopOneService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.shopOneService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
