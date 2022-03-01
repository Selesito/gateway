import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShopTwoDetailComponent } from './shop-two-detail.component';

describe('ShopTwo Management Detail Component', () => {
  let comp: ShopTwoDetailComponent;
  let fixture: ComponentFixture<ShopTwoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopTwoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ shopTwo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ShopTwoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ShopTwoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load shopTwo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.shopTwo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
