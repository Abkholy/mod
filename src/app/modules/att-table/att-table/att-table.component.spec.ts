import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttTableComponent } from './att-table.component';

describe('AttTableComponent', () => {
  let component: AttTableComponent;
  let fixture: ComponentFixture<AttTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
