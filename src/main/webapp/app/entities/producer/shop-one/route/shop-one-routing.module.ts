import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ShopOneComponent } from '../list/shop-one.component';
import { ShopOneDetailComponent } from '../detail/shop-one-detail.component';
import { ShopOneUpdateComponent } from '../update/shop-one-update.component';
import { ShopOneRoutingResolveService } from './shop-one-routing-resolve.service';

const shopOneRoute: Routes = [
  {
    path: '',
    component: ShopOneComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ShopOneDetailComponent,
    resolve: {
      shopOne: ShopOneRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ShopOneUpdateComponent,
    resolve: {
      shopOne: ShopOneRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ShopOneUpdateComponent,
    resolve: {
      shopOne: ShopOneRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(shopOneRoute)],
  exports: [RouterModule],
})
export class ShopOneRoutingModule {}
