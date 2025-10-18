import { UpdateProfileForm } from '../domain/update.profile';
import { UpdateUserDtoRequest } from '../../../infrastructure/users/dto/user.dto';

export function mapUpdateProfileFormToDto(data: UpdateProfileForm): FormData {
  const values = data.getRawValue();

  const formData = new FormData();

  formData.append('name', values.name);
  formData.append('login', values.login);
  formData.append('password', values.passwordNew);

  return formData;
}
