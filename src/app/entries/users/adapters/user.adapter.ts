import { UserDto } from '../../../infrastructure/users/dto/user.dto';
import { User } from '../domain/user';

export function mapUserDtoToUser(dto: UserDto): User {
  return {
    name: dto.name,
    role: dto.role,
    userId: dto.id,
  };
}
