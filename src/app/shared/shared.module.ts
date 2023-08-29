import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMaxLengthFieldFormComponent } from './error-max-length-field-form/error-maxLength-field-form.component';
import { ErrorMinLengthFieldFormComponent } from './error-min-length-field-form/error-minLength-field-form.component';
import { ErrorRequiredFieldFormComponent } from './error-required-field-form/error-required-field-form.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ErrorMaxLengthFieldFormComponent,
    ErrorMinLengthFieldFormComponent,
    ErrorRequiredFieldFormComponent,
  ],
  exports: [
    ErrorMaxLengthFieldFormComponent,
    ErrorMinLengthFieldFormComponent,
    ErrorRequiredFieldFormComponent,
  ],
})
export class SharedModule { }
