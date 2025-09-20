import { Component, input, model } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-modal',
  imports: [Button, Dialog],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  standalone: true,
})
export class Modal {
  header = input('');
  visible = model(false);
}
