import { TestBed } from '@angular/core/testing';

import { BasarService } from './basar.service';

describe('BasarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasarService = TestBed.get(BasarService);
    expect(service).toBeTruthy();
  });
});
