import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ShopOneService } from '../service/shop-one.service';

import { ShopOneComponent } from './shop-one.component';

describe('ShopOne Management Component', () => {
  let comp: ShopOneComponent;
  let fixture: ComponentFixture<ShopOneComponent>;
  let service: ShopOneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ShopOneComponent],
    })
      .overrideTemplate(ShopOneComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ShopOneComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ShopOneService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.shopOnes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
