import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ShopOneService } from '../service/shop-one.service';
import { IShopOne, ShopOne } from '../shop-one.model';

import { ShopOneUpdateComponent } from './shop-one-update.component';

describe('ShopOne Management Update Component', () => {
  let comp: ShopOneUpdateComponent;
  let fixture: ComponentFixture<ShopOneUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let shopOneService: ShopOneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ShopOneUpdateComponent],
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
      .overrideTemplate(ShopOneUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ShopOneUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    shopOneService = TestBed.inject(ShopOneService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const shopOne: IShopOne = { id: 456 };

      activatedRoute.data = of({ shopOne });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(shopOne));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ShopOne>>();
      const shopOne = { id: 123 };
      jest.spyOn(shopOneService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shopOne });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shopOne }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(shopOneService.update).toHaveBeenCalledWith(shopOne);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ShopOne>>();
      const shopOne = new ShopOne();
      jest.spyOn(shopOneService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shopOne });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shopOne }));
      saveSubject.complete();

      // THEN
      expect(shopOneService.create).toHaveBeenCalledWith(shopOne);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ShopOne>>();
      const shopOne = { id: 123 };
      jest.spyOn(shopOneService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shopOne });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(shopOneService.update).toHaveBeenCalledWith(shopOne);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
