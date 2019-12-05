import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCollagesComponent } from './all-collages.component';

describe('AllCollagesComponent', () => {
  let component: AllCollagesComponent;
  let fixture: ComponentFixture<AllCollagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCollagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCollagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
