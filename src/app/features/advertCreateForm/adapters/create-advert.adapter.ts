import { AvertCreateForm } from '../domain/create-advert';

export function mapAdvertFormToDto(
  form: AvertCreateForm,
  uploadFiles: File[] | null,
): FormData {
  const formValues = form.getRawValue();

  const formData = new FormData();
  formData.append('name', formValues.name);
  formData.append('cost', String(formValues.cost));
  formData.append('description', formValues.description ?? '');
  formData.append('phone', formValues.phone.replace(/[()\-\s]/g, ''));
  formData.append('location', formValues.location);
  formData.append('categoryId', formValues.categoryId?.value ?? '');
  // formData.append('categoryId', formValues.categoryId);

  (uploadFiles ?? []).forEach((image: File) =>
    formData.append('images', image),
  );
  return formData;
}
