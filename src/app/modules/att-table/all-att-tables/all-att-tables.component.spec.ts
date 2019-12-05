import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAttTablesComponent } from './all-att-tables.component';

describe('AllAttTablesComponent', () => {
  let component: AllAttTablesComponent;
  let fixture: ComponentFixture<AllAttTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAttTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAttTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
