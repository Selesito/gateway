import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ShopOneComponent } from './list/shop-one.component';
import { ShopOneDetailComponent } from './detail/shop-one-detail.component';
import { ShopOneUpdateComponent } from './update/shop-one-update.component';
import { ShopOneDeleteDialogComponent } from './delete/shop-one-delete-dialog.component';
import { ShopOneRoutingModule } from './route/shop-one-routing.module';

@NgModule({
  imports: [SharedModule, ShopOneRoutingModule],
  declarations: [ShopOneComponent, ShopOneDetailComponent, ShopOneUpdateComponent, ShopOneDeleteDialogComponent],
  entryComponents: [ShopOneDeleteDialogComponent],
})
export class ProducerShopOneModule {}
