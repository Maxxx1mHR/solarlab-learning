import { TLoginForm } from '../domain';
import { LoginRequestDto } from '@infrastructure';

export function mapLoginFormToDto(form: TLoginForm): LoginRequestDto {
  const values = form.getRawValue();
  return {
    login: values.login,
    password: values.password,
  };
}
