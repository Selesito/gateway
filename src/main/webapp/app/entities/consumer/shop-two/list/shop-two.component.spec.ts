import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ShopTwoService } from '../service/shop-two.service';

import { ShopTwoComponent } from './shop-two.component';

describe('ShopTwo Management Component', () => {
  let comp: ShopTwoComponent;
  let fixture: ComponentFixture<ShopTwoComponent>;
  let service: ShopTwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ShopTwoComponent],
    })
      .overrideTemplate(ShopTwoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ShopTwoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ShopTwoService);

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
    expect(comp.shopTwos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
