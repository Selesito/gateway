import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IShopTwo, getShopTwoIdentifier } from '../shop-two.model';

export type EntityResponseType = HttpResponse<IShopTwo>;
export type EntityArrayResponseType = HttpResponse<IShopTwo[]>;

@Injectable({ providedIn: 'root' })
export class ShopTwoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/shop-twos', 'consumer');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(shopTwo: IShopTwo): Observable<EntityResponseType> {
    return this.http.post<IShopTwo>(this.resourceUrl, shopTwo, { observe: 'response' });
  }

  update(shopTwo: IShopTwo): Observable<EntityResponseType> {
    return this.http.put<IShopTwo>(`${this.resourceUrl}/${getShopTwoIdentifier(shopTwo) as number}`, shopTwo, { observe: 'response' });
  }

  partialUpdate(shopTwo: IShopTwo): Observable<EntityResponseType> {
    return this.http.patch<IShopTwo>(`${this.resourceUrl}/${getShopTwoIdentifier(shopTwo) as number}`, shopTwo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IShopTwo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IShopTwo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addShopTwoToCollectionIfMissing(shopTwoCollection: IShopTwo[], ...shopTwosToCheck: (IShopTwo | null | undefined)[]): IShopTwo[] {
    const shopTwos: IShopTwo[] = shopTwosToCheck.filter(isPresent);
    if (shopTwos.length > 0) {
      const shopTwoCollectionIdentifiers = shopTwoCollection.map(shopTwoItem => getShopTwoIdentifier(shopTwoItem)!);
      const shopTwosToAdd = shopTwos.filter(shopTwoItem => {
        const shopTwoIdentifier = getShopTwoIdentifier(shopTwoItem);
        if (shopTwoIdentifier == null || shopTwoCollectionIdentifiers.includes(shopTwoIdentifier)) {
          return false;
        }
        shopTwoCollectionIdentifiers.push(shopTwoIdentifier);
        return true;
      });
      return [...shopTwosToAdd, ...shopTwoCollection];
    }
    return shopTwoCollection;
  }
}
