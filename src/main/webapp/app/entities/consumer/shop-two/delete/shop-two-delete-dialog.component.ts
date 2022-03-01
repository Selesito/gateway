import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IShopTwo } from '../shop-two.model';
import { ShopTwoService } from '../service/shop-two.service';

@Component({
  templateUrl: './shop-two-delete-dialog.component.html',
})
export class ShopTwoDeleteDialogComponent {
  shopTwo?: IShopTwo;

  constructor(protected shopTwoService: ShopTwoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.shopTwoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
