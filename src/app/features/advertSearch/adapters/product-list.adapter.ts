import { Product } from '../domain/product';
import { AdvertSearchResponseDto } from '@infrastructure';

export function mapAdvertSearchDtoToProductList(
  dto: AdvertSearchResponseDto[],
): Product[] {
  return dto.map((d) => ({
    id: d.id,
    imageSrc: d.imagesIds[0],
    title: d.name,
    price: String(d.cost),
    location: d.location,
    publishDate: d.createdAt,
  }));
}
