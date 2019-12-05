import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterControlComponent } from './semester-control.component';

describe('SemesterControlComponent', () => {
  let component: SemesterControlComponent;
  let fixture: ComponentFixture<SemesterControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemesterControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
