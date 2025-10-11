import { inject, Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AvertCreateForm } from '../domain/create-advert';
import { AdvertApiService } from '@infrastructure';
import { AdvertCreateRequestDto } from '../../../infrastructure/advert/dto/advert-create.dto';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateAdvertService {
  private advertApiService = inject(AdvertApiService);
  private router = inject(Router);

  createAdvert(data: AdvertCreateRequestDto) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('cost', String(data.cost));
    formData.append('phone', data.phone);
    formData.append('location', data.location);
    formData.append('categoryId', data.categoryId);

    (data.images ?? []).forEach((f: File) => formData.append('images', f));

    return this.advertApiService
      .createAdvert(formData)
      .pipe(
        tap((advertResponse) =>
          this.router.navigate([`/product/${advertResponse.id}`]),
        ),
      );
  }
}
