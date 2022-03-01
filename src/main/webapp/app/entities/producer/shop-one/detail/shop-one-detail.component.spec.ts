import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShopOneDetailComponent } from './shop-one-detail.component';

describe('ShopOne Management Detail Component', () => {
  let comp: ShopOneDetailComponent;
  let fixture: ComponentFixture<ShopOneDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopOneDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ shopOne: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ShopOneDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ShopOneDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load shopOne on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.shopOne).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
