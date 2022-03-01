import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IShopOne, ShopOne } from '../shop-one.model';

import { ShopOneService } from './shop-one.service';

describe('ShopOne Service', () => {
  let service: ShopOneService;
  let httpMock: HttpTestingController;
  let elemDefault: IShopOne;
  let expectedResult: IShopOne | IShopOne[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ShopOneService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      shopName: 'AAAAAAA',
      owner: 'AAAAAAA',
      category: 'AAAAAAA',
      email: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ShopOne', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ShopOne()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ShopOne', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          shopName: 'BBBBBB',
          owner: 'BBBBBB',
          category: 'BBBBBB',
          email: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ShopOne', () => {
      const patchObject = Object.assign(
        {
          shopName: 'BBBBBB',
          email: 'BBBBBB',
        },
        new ShopOne()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ShopOne', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          shopName: 'BBBBBB',
          owner: 'BBBBBB',
          category: 'BBBBBB',
          email: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a ShopOne', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addShopOneToCollectionIfMissing', () => {
      it('should add a ShopOne to an empty array', () => {
        const shopOne: IShopOne = { id: 123 };
        expectedResult = service.addShopOneToCollectionIfMissing([], shopOne);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(shopOne);
      });

      it('should not add a ShopOne to an array that contains it', () => {
        const shopOne: IShopOne = { id: 123 };
        const shopOneCollection: IShopOne[] = [
          {
            ...shopOne,
          },
          { id: 456 },
        ];
        expectedResult = service.addShopOneToCollectionIfMissing(shopOneCollection, shopOne);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ShopOne to an array that doesn't contain it", () => {
        const shopOne: IShopOne = { id: 123 };
        const shopOneCollection: IShopOne[] = [{ id: 456 }];
        expectedResult = service.addShopOneToCollectionIfMissing(shopOneCollection, shopOne);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(shopOne);
      });

      it('should add only unique ShopOne to an array', () => {
        const shopOneArray: IShopOne[] = [{ id: 123 }, { id: 456 }, { id: 10673 }];
        const shopOneCollection: IShopOne[] = [{ id: 123 }];
        expectedResult = service.addShopOneToCollectionIfMissing(shopOneCollection, ...shopOneArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const shopOne: IShopOne = { id: 123 };
        const shopOne2: IShopOne = { id: 456 };
        expectedResult = service.addShopOneToCollectionIfMissing([], shopOne, shopOne2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(shopOne);
        expect(expectedResult).toContain(shopOne2);
      });

      it('should accept null and undefined values', () => {
        const shopOne: IShopOne = { id: 123 };
        expectedResult = service.addShopOneToCollectionIfMissing([], null, shopOne, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(shopOne);
      });

      it('should return initial array if no ShopOne is added', () => {
        const shopOneCollection: IShopOne[] = [{ id: 123 }];
        expectedResult = service.addShopOneToCollectionIfMissing(shopOneCollection, undefined, null);
        expect(expectedResult).toEqual(shopOneCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
