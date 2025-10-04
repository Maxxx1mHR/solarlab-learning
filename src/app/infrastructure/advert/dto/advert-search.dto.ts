export interface AdvertSearchRequestDto {
  search: string;
  showNonActive: boolean;
  category: string;
}

export interface AdvertSearchResponseDto {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  isActive: boolean;
  imagesIds: string[];
  cost: number;
}
