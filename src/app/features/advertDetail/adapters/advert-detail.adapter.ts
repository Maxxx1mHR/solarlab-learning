import { AdvertDetail } from '../domain/advert.detail';
import { GetAdvertResponseDto } from '../../../infrastructure/advert/dto/advert-get-by-id.dto';
import { dt } from '@primeuix/themes';

export function mapAdvertResponseDtoToAdvertDetail(
  dto: GetAdvertResponseDto,
): AdvertDetail {
  return {
    user: {
      phone: dto.phone,
      name: dto.user.name,
      email: dto.email,
      createdById: dto.user.id,
    },
    advert: {
      id: dto.id,
      title: dto.name,
      price: String(dto.cost),
      location: dto.location,
      description: dto.description,
      imageSrc: dto.imagesIds.map((img) => ({
        src: img,
        id: img,
      })),
      // imagesIds: dto.imagesIds,
      category: {
        id: dto.category.id,
        name: dto.category.name,
      },
    },
  };
}
