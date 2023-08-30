import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateComponent } from './date.component';

describe('DateComponent', () => {
  let component: DateComponent;
  let fixture: ComponentFixture<DateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update current time every second', (done) => {
    const initialTime = component.currentTime;
    setTimeout(() => {
      expect(component.currentTime).not.toEqual(initialTime);
      done();
    }, 1100);
  });
});
