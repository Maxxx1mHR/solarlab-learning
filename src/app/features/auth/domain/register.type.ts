import { FormControl, FormGroup } from '@angular/forms';

export type TRegisterForm = FormGroup<{
  name: FormControl<string>;
  login: FormControl<string>;
  password: FormControl<string>;
  passwordRepeat: FormControl<string>;
}>;
