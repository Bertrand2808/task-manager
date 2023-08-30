import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './date-format.pipe';

@NgModule({
  declarations: [DateFormatPipe], // Add the DateFormatPipe to the declarations array
  imports: [CommonModule],
  exports: [DateFormatPipe]
})
export class DateFormatModule { }
