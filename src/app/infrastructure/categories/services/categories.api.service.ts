import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetAllCategoryResponseDto} from '../dto';
import {environment} from '@environments'
import {GetCategoryResponseDto} from '../dto/category.get-by-id.dto';
import {CreateCategoryRequestDto, CreateCategoryResponseDto} from '../dto/category.create.dto';
import {UpdateCategoryByIdRequestDto, UpdateCategoryByIdResponseDto} from '../dto/category.update-by-id.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService {
  private http = inject(HttpClient);
  private base = environment.baseApiURL;

  getCategories = () => {
    return this.http.get<GetAllCategoryResponseDto>(`${this.base}/categories`);
  }

  getCategory = (id: string) => {
    return this.http.get<GetCategoryResponseDto>(`${this.base}/categories/${id}`)
  }

  createCategory = (data: CreateCategoryRequestDto) => {
    return this.http.post<CreateCategoryResponseDto>(`${this.base}/categories`, {data})
  }

  updateCategory = (id: string, data: UpdateCategoryByIdRequestDto) => {
    return this.http.put<UpdateCategoryByIdResponseDto>(`${this.base}/categories/${id}`, {data});
  }

  deleteCategory = (id: string) => {
    return this.http.delete(`${this.base}/categories/${id}`)
  }
}
