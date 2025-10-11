export interface AdvertCreateRequestDto {
  name: string;
  description?: string;
  // images?: string[]
  images?: File[];
  cost: number;
  email?: string;
  phone: string;
  location: string;
  categoryId: string;
}

export interface AdvertCreateResponseDto {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  isActive: boolean;
  imagesIds: string[];
  cost: 0;
}
