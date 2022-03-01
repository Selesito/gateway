import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IShopTwo, ShopTwo } from '../shop-two.model';
import { ShopTwoService } from '../service/shop-two.service';

@Injectable({ providedIn: 'root' })
export class ShopTwoRoutingResolveService implements Resolve<IShopTwo> {
  constructor(protected service: ShopTwoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShopTwo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((shopTwo: HttpResponse<ShopTwo>) => {
          if (shopTwo.body) {
            return of(shopTwo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ShopTwo());
  }
}
