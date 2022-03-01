import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ShopTwoService } from '../service/shop-two.service';
import { IShopTwo, ShopTwo } from '../shop-two.model';

import { ShopTwoUpdateComponent } from './shop-two-update.component';

describe('ShopTwo Management Update Component', () => {
  let comp: ShopTwoUpdateComponent;
  let fixture: ComponentFixture<ShopTwoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let shopTwoService: ShopTwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ShopTwoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ShopTwoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ShopTwoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    shopTwoService = TestBed.inject(ShopTwoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const shopTwo: IShopTwo = { id: 456 };

      activatedRoute.data = of({ shopTwo });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(shopTwo));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ShopTwo>>();
      const shopTwo = { id: 123 };
      jest.spyOn(shopTwoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shopTwo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shopTwo }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(shopTwoService.update).toHaveBeenCalledWith(shopTwo);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ShopTwo>>();
      const shopTwo = new ShopTwo();
      jest.spyOn(shopTwoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shopTwo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shopTwo }));
      saveSubject.complete();

      // THEN
      expect(shopTwoService.create).toHaveBeenCalledWith(shopTwo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ShopTwo>>();
      const shopTwo = { id: 123 };
      jest.spyOn(shopTwoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shopTwo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(shopTwoService.update).toHaveBeenCalledWith(shopTwo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
