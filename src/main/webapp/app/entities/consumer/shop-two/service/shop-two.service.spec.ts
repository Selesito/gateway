import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IShopTwo, ShopTwo } from '../shop-two.model';

import { ShopTwoService } from './shop-two.service';

describe('ShopTwo Service', () => {
  let service: ShopTwoService;
  let httpMock: HttpTestingController;
  let elemDefault: IShopTwo;
  let expectedResult: IShopTwo | IShopTwo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ShopTwoService);
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

    it('should create a ShopTwo', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ShopTwo()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ShopTwo', () => {
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

    it('should partial update a ShopTwo', () => {
      const patchObject = Object.assign(
        {
          shopName: 'BBBBBB',
          owner: 'BBBBBB',
          category: 'BBBBBB',
          email: 'BBBBBB',
        },
        new ShopTwo()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ShopTwo', () => {
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

    it('should delete a ShopTwo', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addShopTwoToCollectionIfMissing', () => {
      it('should add a ShopTwo to an empty array', () => {
        const shopTwo: IShopTwo = { id: 123 };
        expectedResult = service.addShopTwoToCollectionIfMissing([], shopTwo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(shopTwo);
      });

      it('should not add a ShopTwo to an array that contains it', () => {
        const shopTwo: IShopTwo = { id: 123 };
        const shopTwoCollection: IShopTwo[] = [
          {
            ...shopTwo,
          },
          { id: 456 },
        ];
        expectedResult = service.addShopTwoToCollectionIfMissing(shopTwoCollection, shopTwo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ShopTwo to an array that doesn't contain it", () => {
        const shopTwo: IShopTwo = { id: 123 };
        const shopTwoCollection: IShopTwo[] = [{ id: 456 }];
        expectedResult = service.addShopTwoToCollectionIfMissing(shopTwoCollection, shopTwo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(shopTwo);
      });

      it('should add only unique ShopTwo to an array', () => {
        const shopTwoArray: IShopTwo[] = [{ id: 123 }, { id: 456 }, { id: 59471 }];
        const shopTwoCollection: IShopTwo[] = [{ id: 123 }];
        expectedResult = service.addShopTwoToCollectionIfMissing(shopTwoCollection, ...shopTwoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const shopTwo: IShopTwo = { id: 123 };
        const shopTwo2: IShopTwo = { id: 456 };
        expectedResult = service.addShopTwoToCollectionIfMissing([], shopTwo, shopTwo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(shopTwo);
        expect(expectedResult).toContain(shopTwo2);
      });

      it('should accept null and undefined values', () => {
        const shopTwo: IShopTwo = { id: 123 };
        expectedResult = service.addShopTwoToCollectionIfMissing([], null, shopTwo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(shopTwo);
      });

      it('should return initial array if no ShopTwo is added', () => {
        const shopTwoCollection: IShopTwo[] = [{ id: 123 }];
        expectedResult = service.addShopTwoToCollectionIfMissing(shopTwoCollection, undefined, null);
        expect(expectedResult).toEqual(shopTwoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
