import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-error-required-field-form',
  templateUrl: './error-required-field-form.component.html',
  styleUrls: ['./error-required-field-form.component.css'],
  imports: [
    CommonModule,
  ],
})
export class ErrorRequiredFieldFormComponent {
  @Input() showError: boolean = false;
  @Input() fieldName: string = '';
}
