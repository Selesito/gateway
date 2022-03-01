import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IShopOne, getShopOneIdentifier } from '../shop-one.model';

export type EntityResponseType = HttpResponse<IShopOne>;
export type EntityArrayResponseType = HttpResponse<IShopOne[]>;

@Injectable({ providedIn: 'root' })
export class ShopOneService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/shop-ones', 'producer');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(shopOne: IShopOne): Observable<EntityResponseType> {
    return this.http.post<IShopOne>(this.resourceUrl, shopOne, { observe: 'response' });
  }

  update(shopOne: IShopOne): Observable<EntityResponseType> {
    return this.http.put<IShopOne>(`${this.resourceUrl}/${getShopOneIdentifier(shopOne) as number}`, shopOne, { observe: 'response' });
  }

  partialUpdate(shopOne: IShopOne): Observable<EntityResponseType> {
    return this.http.patch<IShopOne>(`${this.resourceUrl}/${getShopOneIdentifier(shopOne) as number}`, shopOne, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IShopOne>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IShopOne[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addShopOneToCollectionIfMissing(shopOneCollection: IShopOne[], ...shopOnesToCheck: (IShopOne | null | undefined)[]): IShopOne[] {
    const shopOnes: IShopOne[] = shopOnesToCheck.filter(isPresent);
    if (shopOnes.length > 0) {
      const shopOneCollectionIdentifiers = shopOneCollection.map(shopOneItem => getShopOneIdentifier(shopOneItem)!);
      const shopOnesToAdd = shopOnes.filter(shopOneItem => {
        const shopOneIdentifier = getShopOneIdentifier(shopOneItem);
        if (shopOneIdentifier == null || shopOneCollectionIdentifiers.includes(shopOneIdentifier)) {
          return false;
        }
        shopOneCollectionIdentifiers.push(shopOneIdentifier);
        return true;
      });
      return [...shopOnesToAdd, ...shopOneCollection];
    }
    return shopOneCollection;
  }
}
