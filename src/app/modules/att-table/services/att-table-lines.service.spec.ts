import { TestBed } from '@angular/core/testing';

import { AttTableLinesService } from './att-table-lines.service';

describe('AttTableLinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttTableLinesService = TestBed.get(AttTableLinesService);
    expect(service).toBeTruthy();
  });
});
