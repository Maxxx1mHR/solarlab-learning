import { Component, contentChild, input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Message } from 'primeng/message';
import { KeyValuePipe } from '@angular/common';

type MsgDict = Partial<
  Record<'required' | 'minlength' | 'maxlength' | 'email' | 'pattern', string>
>;

@Component({
  selector: 'app-validation-message',
  imports: [Message, KeyValuePipe],
  templateUrl: './validation-message.html',
  styleUrl: './validation-message.scss',
  standalone: true,
})
export class ValidationMessage {
  readonly control = contentChild(NgControl);
  readonly messages = input<Partial<Record<string, string>>>({});

  private normalize(
    dict: Partial<Record<string, string>> | undefined,
  ): MsgDict {
    const d = dict ?? {};
    const get = (k: string) => d[k] ?? d[k.toLowerCase()];
    return {
      required: get('required'),
      minlength: get('minlength') ?? get('minLength'),
      maxlength: get('maxlength') ?? get('maxLength'),
      email: get('email'),
    };
  }

  get c() {
    return this.control();
  }

  get show() {
    const c = this.c;
    return !!c && (c.touched || c.dirty) && c.invalid;
  }

  get errs() {
    return this.c?.errors;
  }

  getTextRequired(): string {
    return this.normalize(this.messages())?.required ?? 'Обязательное поле!';
  }
  getTextMin(): string {
    const provided = this.normalize(this.messages())?.minlength;
    const len = this.errs?.['minlength']?.requiredLength;
    return provided ?? `Минимальная длина ${len ?? ''} символов!`.trim();
  }
  getTextMax(): string {
    const provided = this.normalize(this.messages())?.maxlength;
    const len = this.errs?.['maxlength']?.requiredLength;
    return provided ?? `Максимальная длина ${len ?? ''} символов!`.trim();
  }
  getTextEmail(): string {
    return (
      this.normalize(this.messages())?.email ?? 'Введите корректный e-mail!'
    );
  }
}
