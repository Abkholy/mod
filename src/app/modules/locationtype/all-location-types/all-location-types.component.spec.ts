import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLocationTypesComponent } from './all-location-types.component';

describe('AllLocationTypesComponent', () => {
  let component: AllLocationTypesComponent;
  let fixture: ComponentFixture<AllLocationTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLocationTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLocationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
