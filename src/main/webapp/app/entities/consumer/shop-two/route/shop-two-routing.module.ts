import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ShopTwoComponent } from '../list/shop-two.component';
import { ShopTwoDetailComponent } from '../detail/shop-two-detail.component';
import { ShopTwoUpdateComponent } from '../update/shop-two-update.component';
import { ShopTwoRoutingResolveService } from './shop-two-routing-resolve.service';

const shopTwoRoute: Routes = [
  {
    path: '',
    component: ShopTwoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ShopTwoDetailComponent,
    resolve: {
      shopTwo: ShopTwoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ShopTwoUpdateComponent,
    resolve: {
      shopTwo: ShopTwoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ShopTwoUpdateComponent,
    resolve: {
      shopTwo: ShopTwoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(shopTwoRoute)],
  exports: [RouterModule],
})
export class ShopTwoRoutingModule {}
