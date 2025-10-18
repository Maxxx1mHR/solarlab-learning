import { FormControl, FormGroup } from '@angular/forms';

export type TLoginForm = FormGroup<{
  login: FormControl<string>;
  password: FormControl<string>;
}>;
