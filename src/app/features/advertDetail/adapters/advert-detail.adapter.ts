import { AdvertDetail } from '../domain/advert.detail';
import { GetAdvertResponseDto } from '../../../infrastructure/advert/dto/advert-get-by-id.dto';

export function mapAdvertResponseDtoToAdvertDetail(
  dto: GetAdvertResponseDto,
): AdvertDetail {
  return {
    user: {
      phone: dto.phone,
      name: dto.user.name,
      email: dto.email,
    },
    advert: {
      title: dto.name,
      price: String(dto.cost),
      location: dto.location,
      description: dto.description,
      imageSrc: dto.imagesIds,
    },
  };
}
