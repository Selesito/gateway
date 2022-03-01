import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IShopTwo, ShopTwo } from '../shop-two.model';
import { ShopTwoService } from '../service/shop-two.service';

@Component({
  selector: 'jhi-shop-two-update',
  templateUrl: './shop-two-update.component.html',
})
export class ShopTwoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    shopName: [],
    owner: [],
    category: [],
    email: [],
  });

  constructor(protected shopTwoService: ShopTwoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shopTwo }) => {
      this.updateForm(shopTwo);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shopTwo = this.createFromForm();
    if (shopTwo.id !== undefined) {
      this.subscribeToSaveResponse(this.shopTwoService.update(shopTwo));
    } else {
      this.subscribeToSaveResponse(this.shopTwoService.create(shopTwo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShopTwo>>): void {
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

  protected updateForm(shopTwo: IShopTwo): void {
    this.editForm.patchValue({
      id: shopTwo.id,
      shopName: shopTwo.shopName,
      owner: shopTwo.owner,
      category: shopTwo.category,
      email: shopTwo.email,
    });
  }

  protected createFromForm(): IShopTwo {
    return {
      ...new ShopTwo(),
      id: this.editForm.get(['id'])!.value,
      shopName: this.editForm.get(['shopName'])!.value,
      owner: this.editForm.get(['owner'])!.value,
      category: this.editForm.get(['category'])!.value,
      email: this.editForm.get(['email'])!.value,
    };
  }
}
