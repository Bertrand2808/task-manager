import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[etatColor]'
})
export class EtatColorDirective {
  @Input() set etatColor(etat: string) {
    const classMap: { [key: string]: string } = {
      'TERMINEE': 'bg-success',
      'EN_COURS': 'bg-primary',
      'A_FAIRE': 'bg-danger',
    };

    const cssClass = classMap[etat || ''];
    this.renderer.addClass(this.elementRef.nativeElement, cssClass);
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
}
