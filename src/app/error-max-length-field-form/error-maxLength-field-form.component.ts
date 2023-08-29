import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-error-maxLength-field-form',
  templateUrl: './error-maxLength-field-form.component.html',
  styleUrls: ['./error-maxLength-field-form.component.css'],
  imports: [
    CommonModule,
  ],
})
export class ErrorMaxLengthFieldFormComponent {
  @Input() showError: boolean = false;
  @Input() fieldName: string = '';
}
