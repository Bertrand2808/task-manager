import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-error-minLength-field-form',
  templateUrl: './error-minLength-field-form.component.html',
  styleUrls: ['./error-minLength-field-form.component.css'],
  imports: [
    CommonModule,
  ],
})
export class ErrorMinLengthFieldFormComponent {
  @Input() showError: boolean = false;
  @Input() fieldName: string = '';
}
