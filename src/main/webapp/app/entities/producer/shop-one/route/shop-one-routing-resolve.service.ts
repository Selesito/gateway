import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IShopOne, ShopOne } from '../shop-one.model';
import { ShopOneService } from '../service/shop-one.service';

@Injectable({ providedIn: 'root' })
export class ShopOneRoutingResolveService implements Resolve<IShopOne> {
  constructor(protected service: ShopOneService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShopOne> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((shopOne: HttpResponse<ShopOne>) => {
          if (shopOne.body) {
            return of(shopOne.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ShopOne());
  }
}
