import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSemestersComponent } from './all-semesters.component';

describe('AllSemestersComponent', () => {
  let component: AllSemestersComponent;
  let fixture: ComponentFixture<AllSemestersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSemestersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSemestersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
