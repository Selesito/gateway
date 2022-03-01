import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ShopTwoComponent } from './list/shop-two.component';
import { ShopTwoDetailComponent } from './detail/shop-two-detail.component';
import { ShopTwoUpdateComponent } from './update/shop-two-update.component';
import { ShopTwoDeleteDialogComponent } from './delete/shop-two-delete-dialog.component';
import { ShopTwoRoutingModule } from './route/shop-two-routing.module';

@NgModule({
  imports: [SharedModule, ShopTwoRoutingModule],
  declarations: [ShopTwoComponent, ShopTwoDetailComponent, ShopTwoUpdateComponent, ShopTwoDeleteDialogComponent],
  entryComponents: [ShopTwoDeleteDialogComponent],
})
export class ConsumerShopTwoModule {}
