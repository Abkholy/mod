import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollageControlComponent } from './collage-control.component';

describe('CollageControlComponent', () => {
  let component: CollageControlComponent;
  let fixture: ComponentFixture<CollageControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollageControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollageControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
