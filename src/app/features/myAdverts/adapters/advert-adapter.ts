import { GetAdvertResponseDto } from '../../../infrastructure/advert/dto/advert-get-by-id.dto';
import { Advert } from '../domain/advert';

export function mapAdvertResponseDtoToAdvert(
  dto: GetAdvertResponseDto,
): Advert {
  return {
    id: dto.id,
    imageSrc: dto.imagesIds[0],
    title: dto.name,
    price: String(dto.cost),
    location: dto.location,
    publishDate: dto.created,
  };
}
