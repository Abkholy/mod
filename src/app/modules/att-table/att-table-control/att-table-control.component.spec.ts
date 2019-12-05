import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttTableControlComponent } from './att-table-control.component';

describe('AttTableControlComponent', () => {
  let component: AttTableControlComponent;
  let fixture: ComponentFixture<AttTableControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttTableControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttTableControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
