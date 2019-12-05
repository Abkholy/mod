import { TestBed } from '@angular/core/testing';

import { AttTableService } from './att-table.service';

describe('AttTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttTableService = TestBed.get(AttTableService);
    expect(service).toBeTruthy();
  });
});
