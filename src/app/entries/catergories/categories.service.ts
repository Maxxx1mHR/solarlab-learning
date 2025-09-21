import { inject, Injectable } from '@angular/core';
import { CategoriesApiService } from '@infrastructure';
import { catchError, finalize, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoriesApiService = inject(CategoriesApiService);

  getCategories() {
    return this.categoriesApiService.getCategories().pipe(
      tap(),
      catchError((err) => {
        return throwError(err);
      }),
      finalize(() => null),
    );
  }
}
