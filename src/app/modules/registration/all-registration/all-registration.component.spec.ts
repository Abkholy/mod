import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRegistrationComponent } from './all-registration.component';

describe('AllRegistrationComponent', () => {
  let component: AllRegistrationComponent;
  let fixture: ComponentFixture<AllRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
