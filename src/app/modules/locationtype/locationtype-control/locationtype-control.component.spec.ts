import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationtypeControlComponent } from './locationtype-control.component';

describe('LocationtypeControlComponent', () => {
  let component: LocationtypeControlComponent;
  let fixture: ComponentFixture<LocationtypeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationtypeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationtypeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
