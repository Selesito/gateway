import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IShopOne, ShopOne } from '../shop-one.model';
import { ShopOneService } from '../service/shop-one.service';

@Component({
  selector: 'jhi-shop-one-update',
  templateUrl: './shop-one-update.component.html',
})
export class ShopOneUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    shopName: [],
    owner: [],
    category: [],
    email: [],
  });

  constructor(protected shopOneService: ShopOneService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shopOne }) => {
      this.updateForm(shopOne);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shopOne = this.createFromForm();
    if (shopOne.id !== undefined) {
      this.subscribeToSaveResponse(this.shopOneService.update(shopOne));
    } else {
      this.subscribeToSaveResponse(this.shopOneService.create(shopOne));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShopOne>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(shopOne: IShopOne): void {
    this.editForm.patchValue({
      id: shopOne.id,
      shopName: shopOne.shopName,
      owner: shopOne.owner,
      category: shopOne.category,
      email: shopOne.email,
    });
  }

  protected createFromForm(): IShopOne {
    return {
      ...new ShopOne(),
      id: this.editForm.get(['id'])!.value,
      shopName: this.editForm.get(['shopName'])!.value,
      owner: this.editForm.get(['owner'])!.value,
      category: this.editForm.get(['category'])!.value,
      email: this.editForm.get(['email'])!.value,
    };
  }
}
