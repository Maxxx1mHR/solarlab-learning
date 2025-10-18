import { RegisterRequestDto } from '@infrastructure';
import { TRegisterForm } from '../domain/register.type';

export function mapRegisterFormToDto(form: TRegisterForm): RegisterRequestDto {
  const values = form.getRawValue();
  return {
    name: values.name,
    login: values.login,
    password: values.password,
  };
}
