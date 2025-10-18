import { FormControl, FormGroup } from '@angular/forms';

export type UpdateProfileForm = FormGroup<{
  name: FormControl<string>;
  login: FormControl<string>;
  passwordNew: FormControl<string>;
  passwordRepeat: FormControl<string>;
}>;
