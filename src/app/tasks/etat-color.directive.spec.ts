import { Component, DebugElement, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EtatColorDirective } from './etat-color.directive';

@Component({
  template: `
    <div [etatColor]="etat"></div>
  `
})
class TestComponent {
  etat: string | undefined;
}

describe('EtatColorDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let divEl: DebugElement;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtatColorDirective, TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    divEl = fixture.debugElement.query(By.css('div'));
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as any);
  });

  it('should create an instance', () => {
    // Vérifie que la directive a été créée avec succès
    const directive = new EtatColorDirective(divEl.nativeElement, renderer);
    expect(directive).toBeTruthy();
  });

  it('should add bg-success class for TERMINEE etat', () => {
    // Vérifie que la classe CSS bg-success est ajoutée pour l'état TERMINEE
    component.etat = 'TERMINEE';
    fixture.detectChanges();
    expect(divEl.nativeElement.classList.contains('bg-success')).toBeTrue();
  });

  it('should add bg-primary class for EN_COURS etat', () => {
    // Vérifie que la classe CSS bg-primary est ajoutée pour l'état EN_COURS
    component.etat = 'EN_COURS';
    fixture.detectChanges();
    expect(divEl.nativeElement.classList.contains('bg-primary')).toBeTrue();
  });

  it('should add bg-danger class for A_FAIRE etat', () => {
    // Vérifie que la classe CSS bg-danger est ajoutée pour l'état A_FAIRE
    component.etat = 'A_FAIRE';
    fixture.detectChanges();
    expect(divEl.nativeElement.classList.contains('bg-danger')).toBeTrue();
  });
});
