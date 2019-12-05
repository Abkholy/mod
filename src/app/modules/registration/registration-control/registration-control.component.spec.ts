import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationControlComponent } from './registration-control.component';

describe('RegistrationControlComponent', () => {
  let component: RegistrationControlComponent;
  let fixture: ComponentFixture<RegistrationControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
