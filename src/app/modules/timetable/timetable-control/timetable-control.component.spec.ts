import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableControlComponent } from './timetable-control.component';

describe('TimetableControlComponent', () => {
  let component: TimetableControlComponent;
  let fixture: ComponentFixture<TimetableControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetableControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
