import { TestBed } from '@angular/core/testing';

import { LocationtypeService } from './locationtype.service';

describe('LocationtypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationtypeService = TestBed.get(LocationtypeService);
    expect(service).toBeTruthy();
  });
});
